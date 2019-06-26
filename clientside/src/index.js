import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {createStore} from 'redux';
import vacReducer from './state/vacReducer';
import {Provider} from 'react-redux';

var store = createStore(vacReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
