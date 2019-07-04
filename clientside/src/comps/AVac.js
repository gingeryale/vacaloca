import React, { Component } from 'react';
import {BrowserRouter as Router,Route, Link } from "react-router-dom";
import '../App.css';
import AdminEdit from './AdminEdit';


class AVac extends Component {
 
  render() {
    var vid = this.props.vac.id;
    return (
      <div className="vaca">
        <div>
          <span>
            <Link to="/edit">Edit {vid}</Link>
            <button>x</button></span>
          <span vid={this.props.vac.id}>Follow</span>
        </div>
        <h5>{this.props.vac.vac_destination}</h5>
        <p>{this.props.vac.vac_desc}</p>
        <p>{this.props.vac.vac_checkin}</p>
        <p>{this.props.vac.vac_checkout}</p>
        <p>{this.props.vac.vac_price}</p>

        <Router>     
          <Route path='/edit' render={(props) => 
          <AdminEdit vid={vid} {...props} />}/>
        </Router>
      </div>
      

    );
  }
  
}



export default AVac;
