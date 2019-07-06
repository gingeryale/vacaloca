import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AdminEdit from './AdminEdit';

class AVac extends Component {
  render() {
    var vid = this.props.vac.id;
    return (
      <div className="vaca">
        <div>
          <button onClick={this.gotovaca.bind(this)}>Edit</button>
          <button>x  {this.props.vac.id}</button>
          <span vid={this.props.vac.id}>Follow</span>
        </div>
        <h5>{this.props.vac.vac_destination}</h5>
        <p>{this.props.vac.vac_desc}</p>
        <p>{this.props.vac.vac_checkin}</p>
        <p>{this.props.vac.vac_checkout}</p>
        <p>{this.props.vac.vac_price}</p>
        <Router>
          <Route path='/vacations/:vid' render={(props) =>
            <AdminEdit vid={this.props.vac.id} {...props} />} />
        </Router>
      </div >

    );
  }
  gotovaca() {
    this.props.goto('/vacations/' + this.props.vac.id);
  }

}



export default AVac;
