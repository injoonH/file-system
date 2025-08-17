import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Root,
})

function Root() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>Welcome to the File System</h1>
    </main>
  )
}
