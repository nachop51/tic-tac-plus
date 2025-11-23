import { serve, redis } from 'bun'
import index from './index.html'
import { Server as Engine } from '@socket.io/bun-engine'
import { Server } from 'socket.io'
import { SOCKET_EVENTS } from './common/consts'
import gameHandlers from './server/gameHandlers'

const io = new Server()
const engine = new Engine({
  path: '/socket.io/',
})

io.bind(engine)

io.on('connection', (socket) => {
  console.log('client connected:', socket.id)

  // io.emit('welcome', 'Hello from Bun Socket.IO server!')

  gameHandlers(io, socket)
})

const { fetch: engineFetch, websocket } = engine.handler()

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    '/*': index,

    '/socket.io/*': {
      async GET(request, server) {
        return engineFetch(request, server)
      },
      async POST(request, server) {
        return engineFetch(request, server)
      },
    },

    '/api/hello': {
      async GET(_request) {
        // redis.set('greetings', '0')

        // redis.incr('greetings')

        const value = await redis.hmget('user:10', 'name', 'age', 'test')

        return new Response(`Hello, World!, ${value}`, {
          headers: { 'Content-Type': 'text/plain' },
        })
      },
    },
  },

  websocket,

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
})

console.log(`🚀 Server running at ${server.url}`)
