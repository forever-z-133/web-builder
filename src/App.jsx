import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoMatch from './components/Layouts/NoMatch/NoMatch'

const LazyComponent = children => {
  const LazyComponent = lazy(() => children)
  return (
    <Suspense callback={<div>loading...</div>}><LazyComponent /></Suspense>
  )
}

const NormalComponent = Component => {
  return <Component />
}

const routeConfig = [
  {
    path: '/',
    element: LazyComponent(import('@/pages/Dashboard/Dashboard'))
  },
  {
    path: '/edit',
    element: LazyComponent(import('@/pages/Edit/Edit.jsx'))
  },
  {
    path: '*',
    element: NormalComponent(NoMatch)
  }
]

function App () {
  return (
    <BrowserRouter>
      <Routes>
        {routeConfig.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
export default App
