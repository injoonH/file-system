import { DirectoryItem } from '@/components/explorer/directory-item.tsx'
import { FileItem } from '@/components/explorer/file-item.tsx'
import type { FsItem } from '@/types/fs.ts'

interface Props {
  items: FsItem[]
  indent?: number
}

export function Tree({ items, indent = 0 }: Props) {
  return (
    <>
      {items.map((it) =>
        it.type === 'file' ? (
          <FileItem key={it.id} name={it.name} link={it.link} indent={indent} />
        ) : (
          <DirectoryItem key={it.id} name={it.name} items={it.items} indent={indent} />
        ),
      )}
    </>
  )
}
