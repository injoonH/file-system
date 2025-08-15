import type { FsItem } from '@/types/fs.ts'

export const fsItems: FsItem[] = [
  {
    type: 'directory',
    id: 101,
    name: 'src',
    items: [
      {
        type: 'directory',
        id: 102,
        name: 'components',
        items: [
          {
            type: 'directory',
            id: 103,
            name: 'explorer',
            items: [
              {
                type: 'file',
                id: 3,
                name: 'explorer.tsx',
                link: 'src/components/explorer/explorer.tsx',
              },
              {
                type: 'file',
                id: 4,
                name: 'tree.tsx',
                link: 'src/components/explorer/tree.tsx',
              },
            ],
          },
          {
            type: 'file',
            id: 4,
            name: 'dev-tools.tsx',
            link: 'src/components/dev-tools.tsx',
          },
        ],
      },
      {
        type: 'file',
        id: 1,
        name: 'main.tsx',
        link: 'src/main.tsx',
      },
      {
        type: 'file',
        id: 2,
        name: 'routeTree.gen.ts',
        link: 'src/routeTree.gen.ts',
      },
    ],
  },
]
