import React, { Component } from 'react';
import '../App.css';


class AVac extends Component {
  render() {
    return (
      <div className="vaca">
        <h5>{this.props.vac.name}</h5>
        <p>{this.props.vac.date}</p>
        <p>{this.props.vac.id}</p>
        <p>{this.props.vac.desc}</p>
      </div>
    );
  }
}



export default AVac;
