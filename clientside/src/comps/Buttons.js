import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';


class Buttons extends Component {
  
  render() {
    return (
      <div className="buttons">
        <div>
        <button>edit</button>
        <button>x</button>
        </div>
        <div>
        <button>F</button>
        </div>
      </div>
    );
  }
}



export default Buttons;
