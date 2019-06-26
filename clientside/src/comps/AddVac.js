import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import AVac from './AVac';


class AddVac extends Component {
  render() {
    return (
      <div className="form">
       <input name="name" onChange={this.handleChange.bind(this)} placeholder="name"/>
       <input name="desc" onChange={this.handleChange.bind(this)} placeholder="desc"/>
       <input name="id" onChange={this.handleChange.bind(this)} placeholder="id"/>
        <button onClick={this.sendDataRedux.bind(this)}>Add</button>
      </div>
    );
  }
  handleChange(e){
      this.setState({[e.target.name]: e.target.value})
  }
  sendDataRedux(){
      var newVacaObj = this.state;
      this.props.addVacation(newVacaObj);
  }
}

const mapDispatchToProps = function(dispatch){
    return {
        addVacation: function(newVacaObj){
            dispatch({type:"ADD", data:newVacaObj})
        }
    };
}

const addVac = connect(null, mapDispatchToProps)(AddVac);
export default addVac;
