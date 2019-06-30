import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';


class Register extends Component {
  render() {
    return (
      <div className="form">
       <input name="fname" onChange={this.handleChange.bind(this)} placeholder="firstname"/>
       <input name="lname" onChange={this.handleChange.bind(this)} placeholder="lastname"/>
       <input name="name" onChange={this.handleChange.bind(this)} placeholder="username"/>
       <input type="password" name="pass" onChange={this.handleChange.bind(this)} placeholder="password"/>
        <button onClick={this.props.saveData.bind(this, this.state)}>Add</button>
      </div>
    );
  }
  
  handleChange(e){
      this.setState({[e.target.name]: e.target.value})
  }
 
}


function mapDispatchToProps(dispatch){
  return{
    saveData: function(loginData){
      return dispatch(saveVacaToServer(loginData))
    }
  }
}

function saveVacaToServer(loginData) {
  return async function (dispatch) {
    let r = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });
    const content = await r.json();
  }
}

const register = connect(null, mapDispatchToProps)(Register);
export default register;
