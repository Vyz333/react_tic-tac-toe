import React,{Component} from 'react';
import {render} from 'react-dom';

//Import components
import Main from './components/Main';
import Board from './components/Board'

//import react router deps
import {Router, Route, IndexRoute, hashHistory} from 'react-router'


const router = (
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Board} />
      </Route>
    </Router>
);
//Render
render(router, document.getElementById('root'));
