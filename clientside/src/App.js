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
      <div>
      <h2>Hello {this.props.sayHello}</h2>
      <RouterAdmin />
      </div>
    );
    }
    else if(this.props.isLoggedIn==true && this.props.isAdmin==false){
      return(
        <div>
        <h2>Hello {this.props.sayHello}</h2>
        <RouterUsers />
        </div>
      )
    }
    else{
      return(
        <div>
        <h2>Hello Guest</h2>
        <RouterGuest />
        </div>
      )
    }
  }
}

const mapStateToProps = function (state) {
  return { isLoggedIn: state.isLoggedIn, isAdmin: state.isAdmin, sayHello:state.hello };
}

const app = connect(mapStateToProps, null)(App);
export default app;
