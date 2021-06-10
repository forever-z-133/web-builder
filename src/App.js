import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NoMatch from './components/Layouts/NoMatch/NoMatch';

function App() {
  return (
    <Router basename="/">
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route exact path="/" component={lazy(() => import('@/pages/Dashboard/Dashboard'))} />
          <Route path="/edit" component={lazy(() => import('@/pages/Edit/Edit'))} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
