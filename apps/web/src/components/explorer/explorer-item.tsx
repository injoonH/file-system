import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { KeyboardEventHandler } from 'react'
import { cls } from '@/utils/cls.ts'
import styles from './explorer.module.css'

interface Props {
  id: number
  name: string
  iconSrc: string
  level: number
  isActive?: boolean
  onDoubleClick?: () => void
  onKeyDown?: KeyboardEventHandler
  setRef: (node: HTMLElement | null) => void
}

interface FileProps extends Props {
  type: 'file'
}

interface DirectoryProps extends Props {
  type: 'directory'
  expanded: boolean
}

export function ExplorerItem({
  id,
  name,
  iconSrc,
  level,
  isActive = false,
  onDoubleClick,
  onKeyDown,
  setRef,
  ...props
}: FileProps | DirectoryProps) {
  const { attributes, listeners, setDraggableNodeRef, setDroppableNodeRef, transform, transition } = useSortable({
    id,
    animateLayoutChanges: ({ isSorting, wasDragging }) => !isSorting && !wasDragging,
  })

  const expanded = props.type === 'directory' ? props.expanded : undefined
  const dragStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <li ref={setDroppableNodeRef} role="treeitem" aria-level={level} aria-expanded={expanded}>
      <button
        ref={(it) => {
          setRef(it)
          setDraggableNodeRef(it)
        }}
        className={cls(styles.entry, isActive ? styles.activeEntry : undefined)}
        style={dragStyle}
        onDoubleClick={onDoubleClick}
        onKeyDown={onKeyDown}
        type="button"
        {...attributes}
        {...listeners}
      >
        <img
          className={styles.icon}
          style={{ marginLeft: `${level - 1}em` }}
          src={iconSrc}
          alt={props.type}
          aria-hidden
        />
        <span>{name}</span>
      </button>
    </li>
  )
}
