import { useState } from 'react'
import { Tree } from '@/components/explorer/tree.tsx'
import type { FsItem } from '@/types/fs.ts'
import styles from './explorer.module.css'

interface Props {
  name: string
  items: FsItem[]
  indent?: number
  defaultExpanded?: boolean
}

export function DirectoryItem({ name, items, indent = 0, defaultExpanded = true }: Props) {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded)

  const toggleExpanded = () => {
    setExpanded((prev) => !prev)
  }

  const iconSrc = expanded ? '/images/folder-open.svg' : '/images/folder.svg'

  return (
    <li role="treeitem" aria-expanded={expanded}>
      <div className={styles.entry} style={{ paddingLeft: `${indent}em` }} onClick={toggleExpanded}>
        <img className={styles.icon} src={iconSrc} alt="directory" aria-hidden />
        <span className={styles.name}>{name}</span>
      </div>
      {expanded && (
        <ul role="group">
          <Tree items={items} indent={indent + 1} />
        </ul>
      )}
    </li>
  )
}
