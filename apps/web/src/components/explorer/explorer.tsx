import {
  DndContext,
  type DragEndEvent,
  type DragMoveEvent,
  type DragOverEvent,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { check } from 'kotlinic'
import { useMemo, useRef, useState } from 'react'
import { DirectoryItem } from '@/components/explorer/directory-item.tsx'
import { FileItem } from '@/components/explorer/file-item.tsx'
import { treeItems } from '@/data/tree-items.ts'
import { getProjection } from '@/lib/dnd/get-projection.ts'
import { buildTree } from '@/lib/tree/build-tree.ts'
import { flatten } from '@/lib/tree/flatten.ts'
import { setDirectoryProperty } from '@/lib/tree/set-directory-property.ts'
import type { FlattenedTreeItem, TreeItem } from '@/types/tree.ts'
import styles from './explorer.module.css'

function toggleDirectoryExpanded(items: TreeItem[], id: number): TreeItem[] {
  return setDirectoryProperty(items, id, 'expanded', (it) => !Boolean(it))
}

export function Explorer() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 20 },
    }),
  )

  const [items, setItems] = useState<TreeItem[]>(treeItems)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [overId, setOverId] = useState<number | null>(null)
  const [offsetLeft, setOffsetLeft] = useState<number>(0)

  const itemRefs = useRef<(HTMLElement | null)[]>([])

  const { flattenedItems, flattenedIds } = useMemo(() => {
    const flattenedItems = flatten({ items, ignoreCollapsed: true, ignoreChildrenOfId: activeId })
    const flattenedIds = flattenedItems.map((it) => it.id)
    return { flattenedItems, flattenedIds }
  }, [items, activeId])

  const projected =
    activeId && overId
      ? getProjection({ items: flattenedItems, activeId, overId, dragOffset: offsetLeft, indentWidth: 17 })
      : null

  const resetStates = () => {
    setActiveId(null)
    setOverId(null)
    document.body.style.setProperty('cursor', '')
  }

  const toggleExpanded = (id: number) => {
    setItems((curr) => toggleDirectoryExpanded(curr, id))
  }

  const handleDragStart = ({ active }: DragStartEvent) => {
    const activeId = active.id as number
    setActiveId(activeId)
    setOverId(activeId)
    document.body.style.setProperty('cursor', 'grabbing')
  }

  const handleDragMove = ({ delta }: DragMoveEvent) => {
    setOffsetLeft(delta.x)
  }

  const handleDragOver = ({ over }: DragOverEvent) => {
    const overId = (over?.id ?? null) as number | null
    setOverId(overId)
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    resetStates()

    if (projected && over) {
      const { level, parentId } = projected
      const cloned: FlattenedTreeItem[] = JSON.parse(JSON.stringify(flatten({ items, ignoreCollapsed: false })))

      const overIdx = cloned.findIndex((it) => it.id === over.id)
      const activeIdx = cloned.findIndex((it) => it.id === active.id)
      check(activeIdx !== -1, () => `Active item with id ${active.id} not found in items`)
      const activeItem = cloned[activeIdx]!

      cloned[activeIdx] = { ...activeItem, level, parentId }

      const sorted = arrayMove(cloned, activeIdx, overIdx)
      const newItems = buildTree(sorted)
      setItems(newItems)
    }
  }

  const handleDragCancel = () => {
    resetStates()
  }

  const focusPrev = (idx: number) => {
    itemRefs.current[idx - 1]?.focus()
  }

  const focusNext = (idx: number) => {
    itemRefs.current[idx + 1]?.focus()
  }

  const focusParent = (parentId: number | null) => {
    if (parentId === null) return
    const parentIdx = flattenedItems.findIndex((item) => item.id === parentId)
    itemRefs.current[parentIdx]?.focus()
  }

  return (
    <aside className={styles.explorer}>
      <ul role="tree" aria-label="file system">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={flattenedIds}>
            {flattenedItems.map((it, idx) =>
              it.type === 'file' ? (
                <FileItem
                  key={it.id}
                  id={it.id}
                  name={it.name}
                  link={it.link}
                  level={it.level}
                  setRef={(el) => (itemRefs.current[idx] = el)}
                  focusPrev={() => focusPrev(idx)}
                  focusNext={() => focusNext(idx)}
                  focusParent={() => focusParent(it.parentId)}
                />
              ) : (
                <DirectoryItem
                  key={it.id}
                  id={it.id}
                  name={it.name}
                  expanded={Boolean(it.expanded)}
                  toggleExpanded={() => toggleExpanded(it.id)}
                  level={it.level}
                  setRef={(el) => (itemRefs.current[idx] = el)}
                  focusPrev={() => focusPrev(idx)}
                  focusNext={() => focusNext(idx)}
                />
              ),
            )}
          </SortableContext>
        </DndContext>
      </ul>
    </aside>
  )
}
