import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import App from './App';

import {usuarioAutenticado, parseJwt} from "./services/auth.js";

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
)

reportWebVitals();
