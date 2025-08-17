import { type ReactNode } from 'react'
import { Explorer } from '@/components/explorer/explorer.tsx'
import styles from './root-layout.module.css'

interface Props {
  children: ReactNode
}

export function RootLayout({ children }: Props) {
  return (
    <div className={styles.layout}>
      <Explorer />
      <div>{children}</div>
    </div>
  )
}
