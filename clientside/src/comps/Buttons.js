import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';


class Buttons extends Component {
  
  render() {
    return (
      <div className="buttons">
        <button>admin</button>
        <button>user</button>
      </div>
    );
  }
}



export default Buttons;
