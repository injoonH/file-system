import { useSuspenseQuery } from '@tanstack/react-query'
import { Tree } from '@/components/explorer/tree.tsx'
import { fsItems } from '@/data/fs-items.ts'
import type { FsItem } from '@/types/fs.ts'
import styles from './explorer.module.css'

export function Explorer() {
  const { data: items } = useSuspenseQuery({
    queryKey: ['fs'],
    queryFn: (): Promise<FsItem[]> => new Promise((resolve) => setTimeout(() => resolve(fsItems), 2_000)),
  })

  return (
    <ul className={styles.explorer} role="tree">
      <Tree items={items} />
    </ul>
  )
}
