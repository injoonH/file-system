export interface FsFile {
  type: 'file'
  id: number
  name: string
  link: string
}

export interface FsDirectory {
  type: 'directory'
  id: number
  name: string
  items: FsItem[]
}

export type FsItem = FsFile | FsDirectory
