import styles from './explorer-skeleton.module.css'

export function ExplorerSkeleton() {
  return (
    <>
      <div className={styles.item}>
        <div />
      </div>
      <div className={styles.item} style={{ marginLeft: '1em' }}>
        <div />
      </div>
      <div className={styles.item} style={{ marginLeft: '1em' }}>
        <div />
      </div>
    </>
  )
}
