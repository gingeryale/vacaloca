import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";


class Register extends Component {
  state={
    nameArr:[],
    visible:false
  }
  render() {
    return (
      <div className="form">
      <label>
    Firstname:
    <input name="fname" onChange={this.handleChange.bind(this)} placeholder="firstname" required/>
  </label>
  <label>
  lastname: 
  <input name="lname" onChange={this.handleChange.bind(this)} placeholder="lastname" required/>
  </label>
       
  <label>
       username: <input name="name" required
       onChange={this.handleChange.bind(this)} 
       onBlur={this.once.bind(this)}
       placeholder="username"/>
        </label>
       <span hidden={!this.state.showErr} className="err err_taken">username is not available</span>
       <label>
       password: <input type="password" name="pass" onChange={this.handleChange.bind(this)} placeholder="password" required/>
       </label>
        <button disabled={!this.state.disabledState}
        onClick={this.props.saveData.bind(this, this.state)}>Register</button>
        <span className="err err_empty" hidden={!this.state.visible}>Error: Detected empty form fields</span>
        <p><Link to="/login">Already a member? Login</Link></p>
      </div>
    );
  }
  
  handleChange(e){
      this.setState({[e.target.name]: e.target.value.trim()})
  }

  async once()
  {
      let r = await fetch('http://localhost:3000/api/users/check');
      let data = await r.json();
      this.setState({ nameArr: data }); 
      console.log(this.state);
      let regname = this.state.name;
      let dbArr = this.state.nameArr;
      let result = dbArr.filter(el => el.user_name == regname);
      if(result.length > 0){
        this.setState({disabledState:false});
        this.setState({showErr:true});
      } else {
        this.setState({disabledState:true});
        this.setState({showErr:false});
      }
  }
  

}



function mapDispatchToProps(dispatch){
  return{
    saveData: function(regData){
      console.log(regData);
      if((!regData.fname) || (!regData.lname) || (!regData.name) || (!regData.pass) ||
      (regData.fname=="") || (regData.lname=="") || (regData.name=="") || (regData.pass==""))
      {
        alert ("Error: All fields required");
        this.setState({disabledState:false});
        this.setState({visible:true});
      } else {
        this.setState({disabledState:true});
        this.setState({visible:false});
        return dispatch(saveUserToServer(regData))
      }
    }
  }
}

function saveUserToServer(regData) {
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
      alert("you're registered " + content.name)
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
