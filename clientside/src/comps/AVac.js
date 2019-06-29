import React, { Component } from 'react';
import '../App.css';
import Buttons from './Buttons'


class AVac extends Component {
  state={
    isLoggedIn: false
  }
  render() {
    return (
      <div className="vaca">
        <Buttons login={this.state.isLoggedin}/>
        <h5>{this.props.vac.destination}</h5>
        <p>{this.props.vac.desc}</p>
        <p>{this.props.vac.checkin}</p>
        <p>{this.props.vac.checkout}</p>
        <p>{this.props.vac.price}</p>
      </div>
    );
  }
}



export default AVac;
