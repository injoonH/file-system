interface BaseTreeItem {
  id: number
  name: string
}

interface TreeFile extends BaseTreeItem {
  type: 'file'
  link: string
}

export interface TreeDirectory extends BaseTreeItem {
  type: 'directory'
  items: TreeItem[]
  expanded?: boolean
}

export type TreeItem = TreeFile | TreeDirectory

interface FlattenedTreeFile extends TreeFile {
  parentId: number | null
  level: number
}

interface FlattenedTreeDirectory extends Omit<TreeDirectory, 'items'> {
  parentId: number | null
  level: number
}

export type FlattenedTreeItem = FlattenedTreeFile | FlattenedTreeDirectory
