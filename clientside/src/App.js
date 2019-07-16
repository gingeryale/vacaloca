import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import RouterAdmin from './comps/RouterAdmin';
import RouterUsers from './comps/RouterUsers';
import RouterGuest from './comps/RouterGuest';

class App extends Component {

  render() {
    if(this.props.isLoggedIn==true && this.props.isAdmin==true){
    return (
      <RouterAdmin />
    );
    }
    else if(this.props.isLoggedIn==true && this.props.isAdmin==false){
      return(
        <RouterUsers />
      )
    }
    else{
      return(
        <RouterGuest />
      )
    }
  }
}

const mapStateToProps = function (state) {
  return { isLoggedIn: state.isLoggedIn, isAdmin: state.isAdmin };
}

const app = connect(mapStateToProps, null)(App);
export default app;
