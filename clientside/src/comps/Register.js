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
        <button onClick={this.props.saveData.bind(this, this.state)}>Register</button>
      </div>
    );
  }
  
  handleChange(e){
      this.setState({[e.target.name]: e.target.value})
  }
 
}


function mapDispatchToProps(dispatch){
  return{
    saveData: function(regData){
      return dispatch(saveVacaToServer(regData))
    }
  }
}

function saveVacaToServer(regData) {
  return async function (dispatch) {
    let r = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(regData)
    });
    const content = await r.json();
    console.log(content);
    if(content.msg=="OK"){
      dispatch({type:"REG", data: content});
        this.props.history.push({
          pathname: '/vacations',
        });
    }else{
      this.props.history.push('/login');
    }
  }      
}

const register = connect(null, mapDispatchToProps)(Register);
export default register;
