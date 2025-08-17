import type { FlattenedTreeItem, TreeItem } from '@/types/tree.ts'

export function treeItemFromFlattened(item: FlattenedTreeItem): TreeItem {
  const { id, name } = item
  return item.type === 'file'
    ? { id, name, type: 'file', link: item.link }
    : { id, name, type: 'directory', items: [], expanded: item.expanded }
}
