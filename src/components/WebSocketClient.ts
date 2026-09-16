import { io, Socket } from 'socket.io-client';
import { collectVisitorGeolocation } from '../visitorGeolocation';

export const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4200';
let socket: Socket;
export const getSocket = () => {
  if (!socket) socket = io(process.env.REACT_APP_SOCKET_URL || backendUrl, {
    autoConnect: false,
    auth: callback => { void collectVisitorGeolocation().then(geolocation => callback({ geolocation })); },
  });
  return socket;
};
export const connectSocket = () => getSocket().connect();
