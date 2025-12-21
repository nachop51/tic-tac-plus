import type { Board, Player } from '@/types'
import { useEffect } from 'react'
import Cell from './cell'
import { useGameStore } from '@/lib/stores/use-game'

interface DisplayBoardProps {
  onlineGame?: boolean
  boardState?: Board
  turnState?: Player
}

export default function DisplayBoard({
  boardState,
  turnState,
}: DisplayBoardProps) {
  const board = useGameStore((s) => s.board)
  const turn = useGameStore((s) => s.turn)
  const initializeGame = useGameStore((s) => s.initializeGame)

  useEffect(() => {
    initializeGame(boardState, turnState)
  }, [])

  useEffect(() => {
    // do something..
  }, [board])

  return (
    <div className="grid grid-cols-3">
      {board.map((cell, index) => (
        <Cell cell={cell} index={index} />
      ))}
    </div>
  )
}
