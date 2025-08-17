import { zip } from 'es-toolkit'
import { checkNotNull, error } from 'kotlinic'
import { treeItemFromFlattened } from '@/lib/tree/tree-item-from-flattened.ts'
import type { FlattenedTreeItem, TreeDirectory, TreeItem } from '@/types/tree.ts'

export function buildTree(flattened: FlattenedTreeItem[]): TreeItem[] {
  const result: TreeItem[] = []
  const visited = new Map<number, TreeDirectory>()

  const items = flattened.map(treeItemFromFlattened)

  zip(flattened, items).map(([flat, item]) => {
    const { id, parentId } = flat
    if (parentId === null) {
      result.push(item)
    } else {
      const parent = visited.get(parentId) ?? items.find((it) => it.id === parentId) ?? null
      checkNotNull(parent, () => `Parent with id ${parentId} not found for item with id ${parentId}`)
      if (parent.type === 'file') error(`Item with id ${id} is a file, but expected a directory as a parent.`)
      parent.items.push(item)
    }

    if (item.type === 'directory') {
      visited.set(id, item)
    }
  })

  return result
}
