import type { FlattenedTreeItem, TreeItem } from '@/types/tree.ts'

interface FlattenOptions {
  items: TreeItem[]
  ignoreCollapsed: boolean
  ignoreChildrenOfId?: number | null
}

export function flatten({ items, ignoreCollapsed, ignoreChildrenOfId }: FlattenOptions): FlattenedTreeItem[] {
  const result: FlattenedTreeItem[] = []

  const aux = (items: TreeItem[], level: number = 1, parentId: number | null = null) => {
    items.forEach((it) => {
      if (it.type === 'file') {
        const { type, id, name, link } = it
        result.push({ type, id, name, link, parentId, level })
      } else {
        const { type, id, name, items, expanded } = it
        result.push({ type, id, name, expanded, parentId, level })
        if ((ignoreCollapsed && !expanded) || ignoreChildrenOfId === id) return
        aux(items, level + 1, id)
      }
    })
  }

  aux(items)

  return result
}
