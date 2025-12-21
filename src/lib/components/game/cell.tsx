import { PLAYER, type Cell } from '@/types.d'
import { CircleIcon, CrossIcon } from '../common/icons'
import { cn } from '@/lib/utils'
import { useGameStore } from '@/lib/stores/use-game'

interface CurrentPlayerProps {
  cell: Cell
  index: number
}

export default function Cell({ cell, index }: CurrentPlayerProps) {
  const board = useGameStore((s) => s.board)
  const makeMove = useGameStore((s) => s.makeMove)
  const placeHover = useGameStore((s) => s.placeHover)
  const removeHover = useGameStore((s) => s.removeHover)

  if (!cell.current && !cell.hoveredPlayer) {
    return null
  }

  const handleClick = (index: number) => {
    if (board[index]?.current) {
      return
    }

    return () => {
      makeMove(index)
    }
  }

  const handleMouseEnter = (index: number) => {
    if (board[index]?.current) {
      return
    }

    return () => {
      placeHover(index)
    }
  }

  const handleMouseLeave = (index: number) => {
    if (board[index]?.current) {
      return
    }

    return () => {
      removeHover(index)
    }
  }

  return (
    <div
      className="size-32 border grid place-items-center"
      onClick={handleClick(index)}
      onMouseEnter={handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave(index)}
    >
      <div
        className={cn('size-16', {
          'opacity-40 grayscale': cell.hoveredPlayer,
          'opacity-40': cell.nextToRemove,
        })}
      >
        {(cell.current || cell.hoveredPlayer) === PLAYER.X ? (
          <CrossIcon />
        ) : (
          <CircleIcon />
        )}
      </div>
    </div>
  )
}
