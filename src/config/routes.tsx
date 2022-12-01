import React, { Suspense, lazy, ComponentType, LazyExoticComponent } from 'react'
import NoMatch from '../components/Layouts/NoMatch/NoMatch'

const LazyComponent: React.FC<any> = (Component: LazyExoticComponent<any>) => {
  return <Suspense fallback={<div>loading...</div>}><Component /></Suspense>
}

const NormalComponent: React.FC<any> = (Component: ComponentType<any>) => {
  return <Component />
}

const routeConfig = [
  {
    path: '/',
    element: LazyComponent(lazy(async () => await import('@/pages/Dashboard/Dashboard')))
  },
  {
    path: '/edit',
    element: LazyComponent(lazy(async () => await import('@/pages/Edit/Edit')))
  },
  {
    path: '*',
    element: NormalComponent(NoMatch)
  }
]
export default routeConfig
