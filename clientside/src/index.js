import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import vacReducer from './state/vacReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from "react-router-dom";


var store = createStore(vacReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>,
  document.getElementById('root')
);

