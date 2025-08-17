import { useMatch, useNavigate } from '@tanstack/react-router'
import { ExplorerItem } from '@/components/explorer/explorer-item.tsx'

interface Props {
  id: number
  name: string
  link: string
  level: number
  setRef: (node: HTMLElement | null) => void
  focusPrev: () => void
  focusNext: () => void
  focusParent: () => void
}

export function FileItem({ id, name, link, level, setRef, focusPrev, focusNext, focusParent }: Props) {
  const navigate = useNavigate()
  const match = useMatch({ from: '/tree/$', shouldThrow: false })

  const handleNavigate = () => {
    navigate({ to: '/tree/$', params: { _splat: link } })
  }

  return (
    <ExplorerItem
      type="file"
      id={id}
      name={name}
      iconSrc="/images/file.svg"
      level={level}
      isActive={match?.params._splat === link}
      onDoubleClick={handleNavigate}
      onKeyDown={(event) => {
        switch (event.key) {
          case 'Enter':
            handleNavigate()
            break
          case 'ArrowUp':
            focusPrev()
            break
          case 'ArrowDown':
          case 'ArrowRight':
            focusNext()
            break
          case 'ArrowLeft':
            focusParent()
        }
      }}
      setRef={setRef}
    />
  )
}
