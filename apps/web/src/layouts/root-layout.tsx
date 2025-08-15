import { type ReactNode } from 'react'
import { ExplorerSidebar } from '@/components/explorer/explorer-sidebar.tsx'
import styles from './root-layout.module.css'

interface Props {
  children: ReactNode
}

export function RootLayout({ children }: Props) {
  return (
    <div className={styles.layout}>
      <ExplorerSidebar />
      {children}
    </div>
  )
}
