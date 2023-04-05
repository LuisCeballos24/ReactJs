import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './utils/layout';
import Main from './main';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;