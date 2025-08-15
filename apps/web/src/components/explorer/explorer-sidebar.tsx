import { Suspense } from 'react'
import { ExplorerSkeleton } from '@/components/explorer/explorer-skeleton.tsx'
import { Explorer } from '@/components/explorer/explorer.tsx'
import styles from './explorer-sidebar.module.css'

export function ExplorerSidebar() {
  return (
    <aside className={styles.sidebar}>
      <Suspense fallback={<ExplorerSkeleton />}>
        <Explorer />
      </Suspense>
    </aside>
  )
}
