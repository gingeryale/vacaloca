import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';


class Login extends Component {
  constructor(props){
    super();
  }
  render() {
    return (
      <div className="form">
       <input name="name" onChange={this.handleChange.bind(this)} placeholder="username"/>
       <input type="password" name="pass" onChange={this.handleChange.bind(this)} placeholder="password"/>
        <button onClick={this.props.sendLogin.bind(this, this.state)}>Login</button>
      </div>
    );
  }

  handleChange(e){
      this.setState({[e.target.name]: e.target.value})
  }
 
}

const mapStateToProps = function(state){
  return {isLoggedIn:state.isLoggedIn};
}

function mapDispatchToProps(dispatch){
  return{
    sendLogin: function(loginData){
      return dispatch(sendLogin(loginData))
    }
  }
}
function sendLogin(loginData) {
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
    console.log(content);
    if(content.msg=="OK"){
      dispatch({type:"LOGIN", data: content});
        this.props.history.push('/vacations');
    }else{
      this.props.history.push('/login');
    }
  }      
}

const login = connect(mapStateToProps, mapDispatchToProps)(Login);
export default login;
