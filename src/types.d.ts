export const PLAYER = {
  X: 'X',
  O: 'O',
} as const

export const GAME_STATUS = {
  WAITING: 'waiting',
  PLAYING: 'playing',
  FINISHED: 'finished',
} as const

export type Player = (typeof PLAYER)[keyof typeof PLAYER]
export type Mark = Player | null

export type Cell = {
  current: Mark
  hoveredPlayer: Mark
  nextToRemove?: boolean
}

export type Board = Cell[]

export type Move = {
  pos: number
  cell: Cell
}

export type MoveHistory = Move[]
export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS]
export type GameMode = 'local' | 'online'
