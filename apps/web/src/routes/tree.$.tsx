import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tree/$')({
  component: FileView,
})

function FileView() {
  const { _splat: path } = Route.useParams()

  return (
    <pre>
      <code>{path}</code>
    </pre>
  )
}
