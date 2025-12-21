import { Button, Link } from '@heroui/react'
import { ThemeSwitcher } from './theme-switcher'

interface NavbarProps {
  isConnected?: boolean
}

export default function Navbar({ isConnected }: NavbarProps) {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="flex justify-between items-center py-2 px-6 sm:px-12 max-w-5xl mx-auto">
        <Button variant="light" color="primary" as={Link} href="/">
          Tic Tac Plus
        </Button>
        <div className="flex gap-2 items-center">
          <div
            className={`rounded-full w-3 h-3 border border-background/60 ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <ThemeSwitcher />
        </div>
      </nav>
    </div>
  )
}
