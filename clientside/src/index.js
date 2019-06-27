import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import thunk from 'redux-thunk';


import {createStore, applyMiddleware} from 'redux';
import vacReducer from './state/vacReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

var store = createStore(vacReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
