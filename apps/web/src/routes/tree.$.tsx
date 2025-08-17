import { createFileRoute } from '@tanstack/react-router'
import ky from 'ky'

export const Route = createFileRoute('/tree/$')({
  component: FileView,
  pendingComponent: () => <div>Loading...</div>,
  loader: async ({ params }) => {
    const id = params._splat?.length ?? 1
    const { body } = await ky.get(`https://jsonplaceholder.typicode.com/posts/${id}`).json<{ body: string }>()
    return { body }
  },
})

function FileView() {
  const path = Route.useParams({ select: (params) => params._splat })
  const { body } = Route.useLoaderData()

  return (
    <div style={{ padding: '1rem' }}>
      <pre style={{ marginBottom: '1rem' }}>
        <code>{path}</code>
      </pre>
      <p style={{ maxWidth: '60ch' }}>{body}</p>
    </div>
  )
}
