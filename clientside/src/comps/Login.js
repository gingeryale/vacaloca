import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';


class Login extends Component {
   render() {
    return (
      <div className="form">
       username: <input name="name" onChange={this.handleChange.bind(this)} placeholder="username"/>
       password: <input type="password" name="pass" onChange={this.handleChange.bind(this)} placeholder="password"/>
        <button onClick={this.props.sendLogin.bind(this, this.state)}>Login</button>
        <br />
        <br />
      </div>
    );
  }

  handleChange(e){
      this.setState({[e.target.name]: e.target.value.toLowerCase()})
  }
  
 
}

const mapStateToProps = function(state){
  return {isLoggedIn:state.isLoggedIn, allvacation: state.allVac};
}

const mapDispatchToProps = dispatch => {
  return {
    sendLogin: (loginData) => {dispatch(sendLoginData(loginData))},
  };
};



function sendLoginData(loginData)  {
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
    console.log("login llllllllllllllllllllllllllllllllllllllll");
    console.log(content);
    if(content.msg=="OK"){
      dispatch({type:"LOGIN", data: content});
    }
  }      
}

const login = connect(mapStateToProps, mapDispatchToProps)(Login);
export default login;
