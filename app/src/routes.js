// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import App from './modules/App';
import Chat from './modules/Chat';
import NotFound from './modules/NotFound';
import Client from './modules/Client';

const Routes = (props) => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/chat" component={Chat}/>
        <Route exact path="/client" component={Client}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  </Router>
);

export default Routes;