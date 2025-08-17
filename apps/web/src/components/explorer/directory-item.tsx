import { ExplorerItem } from '@/components/explorer/explorer-item.tsx'

interface Props {
  id: number
  name: string
  expanded: boolean
  toggleExpanded: () => void
  level: number
  setRef: (node: HTMLElement | null) => void
  focusPrev: () => void
  focusNext: () => void
}

export function DirectoryItem({ id, name, expanded, toggleExpanded, level, setRef, focusPrev, focusNext }: Props) {
  const iconSrc = expanded ? '/images/folder-open.svg' : '/images/folder.svg'

  return (
    <ExplorerItem
      type="directory"
      id={id}
      name={name}
      iconSrc={iconSrc}
      level={level}
      onDoubleClick={toggleExpanded}
      onKeyDown={(event) => {
        switch (event.key) {
          case 'Enter':
            toggleExpanded()
            break
          case 'ArrowUp':
            focusPrev()
            break
          case 'ArrowDown':
            focusNext()
            break
          case 'ArrowLeft':
            if (expanded) {
              toggleExpanded()
            } else {
              focusPrev()
            }
            break
          case 'ArrowRight':
            if (expanded) {
              focusNext()
            } else {
              toggleExpanded()
            }
        }
      }}
      setRef={setRef}
      expanded={expanded}
    />
  )
}
