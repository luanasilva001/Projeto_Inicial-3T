import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import App from './App';
import Login from './pages/login/login';
import Equipamentos from './pages/equipamentos/equipamentos'
import Salas from './pages/salas/salas'

import {usuarioAutenticado, parseJwt} from "./services/auth.js";

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/equipamentos" component={Equipamentos} />
      <Route exact path="/salas" component={Salas} />
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
)

reportWebVitals();
