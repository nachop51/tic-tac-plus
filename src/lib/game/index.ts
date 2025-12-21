import type { Board } from '@/types'
import { BOARD_SIZE, WINNING_COMBOS } from '../consts'

export function createBoard(size: number = BOARD_SIZE): Board {
  const board: Board = []

  for (let i = 0; i < size * size; i++) {
    board.push({ current: null, hoveredPlayer: null })
  }

  return board
}

export function isOccupied(index: number, board: Board): boolean {
  const rowIndex = Math.floor(index / BOARD_SIZE)
  const cellIndex = index % BOARD_SIZE

  const cell = board[rowIndex * BOARD_SIZE + cellIndex]

  if (cell == null) return false

  return cell.current !== null
}

export function checkWinner(board: Board): 'X' | 'O' | null {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo as [number, number, number]

    const [c1, c2, c3] = [board[a], board[b], board[c]]

    if (c1 == null || c2 == null || c3 == null) continue

    if (c1.current === c2.current && c1.current === c3.current) {
      return c1.current
    }
  }

  return null
}

export function checkDraw(board: Board): boolean {
  return !checkWinner(board) && board.every((cell) => cell.current !== null)
}
