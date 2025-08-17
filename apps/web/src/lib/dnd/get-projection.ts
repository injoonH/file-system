import { arrayMove } from '@dnd-kit/sortable'
import { clamp } from 'es-toolkit'
import { check } from 'kotlinic'
import { getDragLevel } from '@/lib/dnd/get-drag-level.ts'
import type { FlattenedTreeItem } from '@/types/tree.ts'

function getMaxLevel(item: FlattenedTreeItem | undefined): number {
  if (item === undefined) return 1
  return item.type === 'file' ? item.level : item.level + 1
}

interface Options {
  items: FlattenedTreeItem[]
  activeId: number
  overId: number
  dragOffset: number
  indentWidth: number
}

export function getProjection({ items, activeId, overId, dragOffset, indentWidth }: Options) {
  const overItemIdx = items.findIndex((it) => it.id === overId)
  const activeItemIdx = items.findIndex((it) => it.id === activeId)
  check(activeItemIdx !== -1, () => `Active item with id ${activeId} not found in items`)
  const activeItem = items[activeItemIdx]!

  const newItems = arrayMove(items, activeItemIdx, overItemIdx)
  const prevItem = newItems[overItemIdx - 1]
  const nextItem = newItems[overItemIdx + 1]

  const dragLevel = getDragLevel(dragOffset, indentWidth)
  const projectedLevel = activeItem.level + dragLevel
  const maxLevel = getMaxLevel(prevItem)
  const minLevel = nextItem?.level ?? 1
  const level = clamp(projectedLevel, minLevel, maxLevel)

  const getParentId = (): number | null => {
    if (level === 1 || !prevItem) return null
    if (level === prevItem.level) return prevItem.parentId
    if (level > prevItem.level) return prevItem.id
    return newItems.slice(0, overItemIdx).findLast((it) => it.level === level)?.parentId ?? null
  }

  return { level, maxLevel, minLevel, parentId: getParentId() }
}
