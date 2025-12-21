import { SOCKET_EVENTS } from '@/common/consts'
import Layout from '@/lib/components/common/layout'
import { socket } from '@/lib/socket'
import { Button, Divider } from '@heroui/react'
import DisplayBoard from '@/lib/components/game/display-board'
import { useEffect } from 'react'
import { useLocation } from 'wouter'

export default function HomePage() {
  const [, setLocation] = useLocation()

  const handleClick = () => {
    socket.emit(SOCKET_EVENTS.CREATE_GAME)
  }

  useEffect(() => {
    socket.on('welcome', (message: string) => {
      console.log(message)
    })

    const onRoomCreated = (roomId: string) => {
      console.log({ roomId })
      setLocation('/game/' + roomId)
    }

    socket.on(SOCKET_EVENTS.GAME_CREATED, onRoomCreated)

    return () => {
      socket.off(SOCKET_EVENTS.GAME_CREATED, onRoomCreated)
    }
  }, [])

  return (
    <Layout className="justify-start flex-col items-start">
      <header>
        <h1 className="text-3xl mb-2">Welcome to Tic Tac Plus!</h1>
        <p>This is the home page.</p>
      </header>

      <Button onPress={handleClick}>Create game</Button>

      <Divider className="my-4 w-full" />

      <DisplayBoard onlineGame={false} />
    </Layout>
  )
}
