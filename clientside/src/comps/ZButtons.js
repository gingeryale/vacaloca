import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';


class Buttons extends Component {
  constructor(props){
    super()
    this.vid = props.vid;
    console.log(this);
  }
  render() {
    return (
      <div>
        <div>
        <p vid={this.props.vid} data-id={this.props.vid}>EEE{this.props.vid}E</>
        <button vid={this.props.vid} data-id={this.props.vid}>Delete</button>
        </div>
        <div>
        <button vid={this.props.vid} data-id={this.props.vid}>FFFFF</button>
        </div>
      </div>
    );
  }
}



export default Buttons;
