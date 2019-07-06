import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import RouterAdmin from './comps/RouterAdmin';
import RouterUsers from './comps/RouterUsers';

class App extends Component {

  render() {

    return (
      <RouterAdmin />
    );


  }
}

const mapStateToProps = function (state) {
  return { isLoggedIn: state.isLoggedIn };
}

const app = connect(mapStateToProps, null)(App);
export default app;
