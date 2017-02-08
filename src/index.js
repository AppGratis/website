import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './App';
import Home from './home/Home';
import ConfigGenerator from './generator/ConfigGenerator';
import NotFoundError from './NotFoundError';

//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './bootstrap-paper.min.css'

import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="generator" component={ConfigGenerator} />
      <Route path="*" component={NotFoundError} />
    </Route>
  </Router>,
  document.getElementById('root')
);
