import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MessagesProvider } from '../context/messages.tsx';
import ChatPanel from './ChatPanel2';

jest.mock('react-markdown', () => ({ children }) => <div>{children}</div>);
jest.mock('remark-gfm', () => () => {});
const mockHandlers = {};
const mockSocket = {
  connected: true,
  on: jest.fn((name, handler) => { mockHandlers[name] = handler; }),
  off: jest.fn(), connect: jest.fn(), disconnect: jest.fn(),
  volatile: { emit: jest.fn() },
};
jest.mock('./WebSocketClient.ts', () => ({ getSocket: () => mockSocket, backendUrl: 'http://localhost:4200' }));
const limits = { blocked: false, reason: null, retryAt: null, retryAfterSeconds: 0 };
beforeEach(() => {
  localStorage.clear(); jest.clearAllMocks(); mockSocket.connected = true;
  mockSocket.on.mockImplementation((name, handler) => { mockHandlers[name] = handler; });
  let id = 0; Object.defineProperty(window, 'crypto', { configurable: true, value: { randomUUID: () => 'id-' + ++id } });
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => limits });
  AbortSignal.timeout = () => new AbortController().signal;
});
test('sends the latest question exactly once and joins immediate stream chunks', async () => {
  render(<MessagesProvider><ChatPanel /></MessagesProvider>);
  fireEvent.change(screen.getByLabelText('Üzenet'), { target: { value: 'My newest question' } });
  await waitFor(() => expect(screen.getByText('Küldés')).toBeEnabled());
  fireEvent.click(screen.getByText('Küldés'));
  const [event, payload] = mockSocket.volatile.emit.mock.calls[0];
  expect(event).toBe('aiResponse');
  expect(payload.msgs.filter(m => m.text === 'My newest question')).toHaveLength(1);
  expect(payload.msgs.at(-1).text).toBe('My newest question');
  expect(screen.getByText('Küldés')).toBeDisabled();
  await act(async () => {
    mockHandlers.aiResponseGetCL(JSON.stringify({ id: payload.id, lastResp: 'First ', finished: false }));
    mockHandlers.aiResponseGetCL(JSON.stringify({ id: payload.id, lastResp: 'second', finished: false }));
    mockHandlers.aiResponseGetCL(JSON.stringify({ id: payload.id, lastResp: '', finished: true }));
  });
  expect(screen.getByText('First second')).toBeInTheDocument();
  expect(screen.queryByText('Válasz készül…')).not.toBeInTheDocument();
  fireEvent.click(screen.getByText('Új chat'));
  expect(screen.queryByText('First second')).not.toBeInTheDocument();
  await waitFor(() => expect(fetch).toHaveBeenCalled());
});
test('hides exact limits and blocks clicks and Enter during a known cooldown', async () => {
  render(<MessagesProvider><ChatPanel /></MessagesProvider>);
  fireEvent.change(screen.getByLabelText('Üzenet'), { target: { value: 'Hello' } });
  await waitFor(() => expect(screen.getByText('Küldés')).toBeEnabled());
  expect(screen.queryByLabelText('Kérések korlátai')).not.toBeInTheDocument();
  expect(screen.queryByText(/maradt/)).not.toBeInTheDocument();
  act(() => mockHandlers.rateLimitStatus({ ...limits, blocked: true, reason: 'monthly_budget', retryAt: new Date(Date.now() + 60000).toISOString() }));
  expect(screen.getByRole('alert')).toHaveTextContent('havi AI-keret');
  expect(screen.getByText('Küldés')).toBeDisabled();
  expect(screen.queryByText(/\$3/)).not.toBeInTheDocument();
  fireEvent.click(screen.getByText('Küldés'));
  fireEvent.keyDown(screen.getByLabelText('Üzenet'), { key: 'Enter' });
  expect(mockSocket.volatile.emit).not.toHaveBeenCalled();
  act(() => mockHandlers.rateLimitStatus(limits));
  expect(screen.getByText('Küldés')).toBeDisabled();
});
test('disconnect clears pending without replaying the question', async () => {
  render(<MessagesProvider><ChatPanel /></MessagesProvider>);
  fireEvent.change(screen.getByLabelText('Üzenet'), { target: { value: 'Hello' } });
  await waitFor(() => expect(screen.getByText('Küldés')).toBeEnabled());
  fireEvent.click(screen.getByText('Küldés'));
  act(() => mockHandlers.disconnect());
  expect(screen.queryByText('Válasz készül…')).not.toBeInTheDocument();
  expect(mockSocket.volatile.emit).toHaveBeenCalledTimes(1);
});
test('waits for fresh status after completion and ignores an older open response', async () => {
  let resolveStatus;
  global.fetch.mockImplementation(() => new Promise(resolve => { resolveStatus = resolve; }));
  render(<MessagesProvider><ChatPanel /></MessagesProvider>);
  fireEvent.change(screen.getByLabelText('Üzenet'), { target: { value: 'First' } });
  fireEvent.keyDown(screen.getByLabelText('Üzenet'), { key: 'Enter' });
  expect(mockSocket.volatile.emit).not.toHaveBeenCalled();
  await act(async () => resolveStatus({ ok: true, json: async () => limits }));
  fireEvent.click(screen.getByText('Küldés'));
  const payload = mockSocket.volatile.emit.mock.calls[0][1];
  act(() => mockHandlers.aiResponseGetCL(JSON.stringify({ id: payload.id, lastResp: 'Answer', finished: true })));
  fireEvent.change(screen.getByLabelText('Üzenet'), { target: { value: 'Next' } });
  fireEvent.keyDown(screen.getByLabelText('Üzenet'), { key: 'Enter' });
  expect(mockSocket.volatile.emit).toHaveBeenCalledTimes(1);
  act(() => mockHandlers.rateLimitStatus({ ...limits, blocked: true, reason: 'request_rate', retryAt: new Date(Date.now() + 60000).toISOString() }));
  await act(async () => resolveStatus({ ok: true, json: async () => limits }));
  fireEvent.keyDown(screen.getByLabelText('Üzenet'), { key: 'Enter' });
  expect(mockSocket.volatile.emit).toHaveBeenCalledTimes(1);
  expect(screen.getByText('Küldés')).toBeDisabled();
  // Cooldown expiration requires another server status, not a blind local unlock.
  act(() => mockHandlers.rateLimitStatus({ ...limits, blocked: true, reason: 'request_rate', retryAt: new Date(Date.now() - 1000).toISOString() }));
  act(() => mockHandlers.rateLimitStatus(limits));
  fireEvent.click(screen.getByText('Küldés'));
  expect(mockSocket.volatile.emit).toHaveBeenCalledTimes(2);
});
