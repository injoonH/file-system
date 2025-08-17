import type { TreeDirectory, TreeItem } from '@/types/tree.ts'

export function setDirectoryProperty<T extends keyof TreeDirectory>(
  items: TreeItem[],
  id: number,
  property: T,
  setter: (value: TreeDirectory[T]) => TreeDirectory[T],
): TreeItem[] {
  return items.map((it) => {
    if (it.type === 'file') return it
    if (it.id === id) return { ...it, [property]: setter(it[property]) }
    return {
      ...it,
      items: setDirectoryProperty(it.items, id, property, setter),
    }
  })
}
