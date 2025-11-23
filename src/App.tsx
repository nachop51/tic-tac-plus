import { useEffect, useState } from 'react'
import './index.css'
import { socket } from './lib/socket'
import Providers from './lib/providers'
import Navbar from './lib/components/navbar'
import { Route, Switch } from 'wouter'
import HomePage from './pages'

export function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <Providers>
      <Navbar isConnected={isConnected} />

      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </Providers>
  )
}

export default App
