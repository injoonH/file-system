import type { TreeItem } from '@/types/tree.ts'

export const treeItems: TreeItem[] = [
  {
    type: 'directory',
    id: 101,
    name: 'src',
    expanded: true,
    items: [
      {
        type: 'directory',
        id: 102,
        name: 'components',
        expanded: true,
        items: [
          {
            type: 'directory',
            id: 103,
            name: 'explorer',
            expanded: true,
            items: [
              {
                type: 'file',
                id: 1,
                name: 'explorer.tsx',
                link: 'src/components/explorer/explorer.tsx',
              },
              {
                type: 'file',
                id: 2,
                name: 'tree.tsx',
                link: 'src/components/explorer/tree.tsx',
              },
            ],
          },
          {
            type: 'file',
            id: 3,
            name: 'dev-tools.tsx',
            link: 'src/components/dev-tools.tsx',
          },
        ],
      },
      {
        type: 'file',
        id: 4,
        name: 'main.tsx',
        link: 'src/main.tsx',
      },
      {
        type: 'file',
        id: 5,
        name: 'routeTree.gen.ts',
        link: 'src/routeTree.gen.ts',
      },
    ],
  },
  {
    type: 'directory',
    id: 201,
    name: 'public',
    expanded: true,
    items: [
      {
        type: 'file',
        id: 6,
        name: 'favicon.ico',
        link: 'public/favicon.ico',
      },
      {
        type: 'file',
        id: 7,
        name: 'index.html',
        link: 'public/index.html',
      },
    ],
  },
  {
    type: 'file',
    id: 8,
    name: 'package.json',
    link: 'package.json',
  },
  {
    type: 'file',
    id: 9,
    name: 'tsconfig.json',
    link: 'tsconfig.json',
  },
]
