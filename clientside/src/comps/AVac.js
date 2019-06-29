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
        <h5>{this.props.vac.vac_destination}</h5>
        <p>{this.props.vac.vac_desc}</p>
        <p>{this.props.vac.vac_checkin}</p>
        <p>{this.props.vac.vac_checkout}</p>
        <p>{this.props.vac.vac_price}</p>
      </div>
    );
  }
}



export default AVac;
