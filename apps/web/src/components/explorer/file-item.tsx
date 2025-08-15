import { Link } from '@tanstack/react-router'
import { cls } from '@/utils/cls.ts'
import styles from './explorer.module.css'

interface Props {
  name: string
  link: string
  indent?: number
}

export function FileItem({ name, link, indent = 0 }: Props) {
  return (
    <li role="treeitem">
      <Link
        className={cls(styles.entry, styles.link)}
        style={{ paddingLeft: `${indent}em` }}
        to="/tree/$"
        params={{ _splat: link }}
        activeProps={{ className: styles.activeLink }}
      >
        <img className={styles.icon} src="/images/file.svg" alt="file" aria-hidden />
        <span className={styles.name}>{name}</span>
      </Link>
    </li>
  )
}
