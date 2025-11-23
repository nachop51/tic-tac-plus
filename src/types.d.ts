export type Mark = 'X' | 'O' | null

export type GameState = {
  id: string
  playerX: string
  playerO: string
  board: Mark[]
  currentTurn: Mark
  turn: Exclude<Mark, null>
  winner: Mark | 'draw'
}
