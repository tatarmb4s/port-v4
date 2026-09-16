beforeEach(() => {
  jest.resetModules();
  process.env.REACT_APP_IPREGISTRY_API_KEY = 'browser-test-key';
  global.fetch = jest.fn();
});
afterEach(() => { delete process.env.REACT_APP_IPREGISTRY_API_KEY; jest.useRealTimers(); });

test('one browser origin lookup is shared by visits and socket authentication', async () => {
  const geo = { ip: '8.8.8.8', location: { city: 'Test City' }, user_agent: { name: 'Browser' }, unexpected: 'discard' };
  fetch.mockResolvedValueOnce({ ok: true, json: async () => geo }).mockResolvedValue({ ok: true });
  const { collectVisitorGeolocation, reportVisit } = require('./visitorGeolocation');
  const first = collectVisitorGeolocation();
  expect(collectVisitorGeolocation()).toBe(first);
  await reportVisit('https://backend.example', '/portfolio');
  expect(fetch.mock.calls[0][0]).toBe('https://api.ipregistry.co/?key=browser-test-key&hostname=true');
  const forwarded = JSON.parse(fetch.mock.calls[1][1].body);
  expect(forwarded).toEqual({ path: '/portfolio', geolocation: { status: 'ok', ip: geo.ip, location: geo.location, user_agent: geo.user_agent } });
  expect(fetch).toHaveBeenCalledTimes(2);
  const socketOptions = {};
  jest.doMock('socket.io-client', () => ({ io: (_url, options) => { Object.assign(socketOptions, options); return {}; } }));
  require('./components/WebSocketClient.ts').getSocket();
  const callback = jest.fn();
  socketOptions.auth(callback);
  await Promise.resolve();
  expect(callback).toHaveBeenCalledWith({ geolocation: forwarded.geolocation });
  expect(fetch).toHaveBeenCalledTimes(2);
});

test.each(['network', 'http', 'malformed'])('lookup %s failure still forwards a visit', async failure => {
  if (failure === 'network') fetch.mockRejectedValueOnce(new Error('offline'));
  else fetch.mockResolvedValueOnce({ ok: failure !== 'http', json: async () => ({}) });
  fetch.mockResolvedValue({ ok: true });
  await require('./visitorGeolocation').reportVisit('https://backend.example', '/');
  expect(JSON.parse(fetch.mock.calls[1][1].body).geolocation).toEqual({ status: 'unavailable' });
});

test('a slow lookup aborts after five seconds and does not block the visit', async () => {
  jest.useFakeTimers();
  fetch.mockImplementationOnce((_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error('aborted')));
  })).mockResolvedValue({ ok: true });
  const visit = require('./visitorGeolocation').reportVisit('https://backend.example', '/');
  jest.advanceTimersByTime(5000);
  await visit;
  expect(JSON.parse(fetch.mock.calls[1][1].body).geolocation.status).toBe('unavailable');
});

test('missing key skips IPRegistry but still reports the visit', async () => {
  delete process.env.REACT_APP_IPREGISTRY_API_KEY;
  fetch.mockResolvedValue({ ok: true });
  await require('./visitorGeolocation').reportVisit('https://backend.example', '/');
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(JSON.parse(fetch.mock.calls[0][1].body).geolocation.status).toBe('disabled');
});
