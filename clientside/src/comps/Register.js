import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';


class Register extends Component {
  state={
    nameArr:[],
    visible:false,
    allvacation: this.props.allvacation
  }

  componentWillReceiveProps(){
    this.props.allvacation;
  }


  render() {
    return (
      <div className="form">
      <label>
    First name:
    <input name="fname" onChange={this.handleChange.bind(this)} placeholder="firstname" required/>
  </label>
  <label>
  Last name: 
  <input name="lname" onChange={this.handleChange.bind(this)} placeholder="lastname" required/>
  </label>
       
  <label>
       Username: <input name="name" required
       onChange={this.handleChange.bind(this)} 
       onBlur={this.once.bind(this)}
       placeholder="username"/>
        </label>
       <span hidden={!this.state.showErr} className="err err_taken">username is not available</span>
       <label>
       Password: <input type="password" name="pass" onChange={this.handleChange.bind(this)} placeholder="password" required/>
       </label>
        <button disabled={!this.state.disabledState}
        onClick={this.props.saveData.bind(this, this.state)}>Register</button>
        <span className="err err_empty" hidden={!this.state.visible}>Error: Detected empty form fields</span>
      </div>
    );
  }
  
  handleChange(e){
      this.setState({[e.target.name]: e.target.value.toLowerCase().trim()})
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


const mapStateToProps = function(state){
  return {allvacation: state.allVac};
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
        return dispatch(saveUserToServer(regData));
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
      alert("you're registered " + content.name);
       
    }else{
      alert("error")
    }
  }      
}

const register = connect(mapStateToProps, mapDispatchToProps)(Register);
export default register;
