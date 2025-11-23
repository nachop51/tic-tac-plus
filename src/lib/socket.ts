import { io } from 'socket.io-client'

export const socket = io('ws://localhost:3000', {
  autoConnect: true,
  reconnectionDelayMax: 10000,
  transports: ['websocket'],
})
