import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';


class Register extends Component {
  state={
    nameArr:[],
  }
  render() {
    return (
      <div className="form">
       <input name="fname" required onChange={this.handleChange.bind(this)} placeholder="firstname"/>
       <input name="lname" required onChange={this.handleChange.bind(this)} placeholder="lastname"/>
       <input name="name" required 
       onChange={this.handleChange.bind(this)} 
       onBlur={this.once.bind(this)} 
       placeholder="username"/>
       <span hidden={!this.state.showErr} className="error_taken">That name is already taken</span>
       <input type="password" required name="pass" onChange={this.handleChange.bind(this)} placeholder="password"/>
        <button disabled={!this.state.isUnique} onClick={this.props.saveData.bind(this, this.state)}>Register</button>
      </div>
    );
  }
  
  handleChange(e){
      this.setState({[e.target.name]: e.target.value})
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
        this.setState({isUnique:false});
        this.setState({showErr:true});
      } else {
        this.setState({isUnique:true});
      }
  }
}


function mapDispatchToProps(dispatch){
  return{
    saveData: function(regData){
      return dispatch(saveUserToServer(regData))
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
