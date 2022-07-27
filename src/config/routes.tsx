import React, { Suspense, lazy, ComponentType, LazyExoticComponent } from 'react';
import NoMatch from '../components/Layouts/NoMatch/NoMatch';

const LazyComponent = (Component: LazyExoticComponent<any>) => {
  return <Suspense fallback={<div>loading...</div>}><Component /></Suspense>;
};

const NormalComponent = (Component: ComponentType<any>) => {
  return <Component />;
};

const routeConfig = [
  {
    path: '/',
    element: LazyComponent(lazy(() => import('@/pages/Dashboard/Dashboard'))),
  },
  {
    path: '/edit',
    element: LazyComponent(lazy(() => import('@/pages/Edit/Edit'))),
  },
  {
    path: '*',
    element: NormalComponent(NoMatch),
  },
];
export default routeConfig;
