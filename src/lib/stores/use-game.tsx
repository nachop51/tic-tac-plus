import {
  GAME_STATUS,
  PLAYER,
  type Board,
  type GameStatus,
  type Player,
} from '@/types.d'
import { create } from 'zustand'
import { INITIAL_TURN } from '../consts'
import { checkWinner, createBoard } from '../game'

interface Game {
  board: Board
  turn: Player
  gameWinner: Player | null
  gameStatus: GameStatus

  initializeGame: (board?: Board, turn?: Player) => void
  checkWinner: (board: Board) => void
  makeMove: (index: number) => void
  placeHover: (index: number) => void
  removeHover: (index: number) => void
}

export const useGameStore = create<Game>()((set, get) => ({
  board: createBoard(),
  turn: INITIAL_TURN,
  gameWinner: null,
  gameStatus: GAME_STATUS.WAITING,

  initializeGame: (board, turn) => {
    set({
      board: board ?? createBoard(),
      turn: turn ?? INITIAL_TURN,
      gameStatus: GAME_STATUS.PLAYING,
      gameWinner: null,
    })
  },

  checkWinner: (board) => {
    const winner = checkWinner(board)

    const newGameStatus = winner ? GAME_STATUS.FINISHED : GAME_STATUS.PLAYING

    set({ gameWinner: winner, gameStatus: newGameStatus })
  },

  makeMove: (index) => {
    const state = get()

    const newBoard = [...state.board]
    if (newBoard[index]?.current) return state.board

    newBoard[index] = {
      ...newBoard[index],
      current: state.turn,
      hoveredPlayer: null,
    }

    const nextTurn: Player = state.turn === PLAYER.X ? PLAYER.O : PLAYER.X

    get().checkWinner(newBoard)

    set({ board: newBoard, turn: nextTurn })
  },

  placeHover: (index) => {
    console.log('here!!')
    const state = get()

    const newBoard = [...state.board]

    if (!newBoard[index]) return state.board

    newBoard[index] = {
      ...newBoard[index],
      hoveredPlayer: state.turn,
    }

    console.log({ newBoard, index })

    set({ board: newBoard })
  },
  removeHover: (index) => {
    const state = get()

    const newBoard = [...state.board]
    if (!newBoard[index]) return state.board

    newBoard[index] = {
      ...newBoard[index],
      hoveredPlayer: null,
    }

    set({ board: newBoard })
  },
}))
