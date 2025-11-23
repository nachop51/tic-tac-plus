import { SOCKET_EVENTS } from '@/common/consts'
import type { Server, Socket } from 'socket.io'

export default function (io: Server, socket: Socket) {
  socket.on(SOCKET_EVENTS.CREATE_GAME, () => {
    const roomId = crypto.getRandomValues(new Uint32Array(1))[0]!.toString(16)

    socket.join(roomId)

    socket.data.room = roomId

    socket.emit(SOCKET_EVENTS.GAME_CREATED, roomId)
  })
}
