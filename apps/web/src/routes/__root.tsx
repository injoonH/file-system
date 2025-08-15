import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { DevTools } from '@/components/dev-tools.tsx'
import { RootLayout } from '@/layouts/root-layout.tsx'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
})

function Root() {
  return (
    <>
      <RootLayout>
        <Outlet />
      </RootLayout>
      <DevTools />
    </>
  )
}
