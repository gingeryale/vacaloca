import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';


class AddVac extends Component {
  render() {
    return (
      <div className="form">
       <input name="destination" onChange={this.handleChange.bind(this)} placeholder="name"/>
       <input name="desc" onChange={this.handleChange.bind(this)} placeholder="desc"/>
       <input name="price" onChange={this.handleChange.bind(this)} placeholder="price"/>
       <input type="date" name="checkin" onChange={this.handleChange.bind(this)} placeholder="check-in"/>
       <input type="date" name="checkout" onChange={this.handleChange.bind(this)} placeholder="check-out"/>
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
    saveData: function(vaca){
      return dispatch(saveVacaToServer(vaca))
    }
  }
}

function saveVacaToServer(vaca) {
  return async function (dispatch) {
    let r = await fetch('http://localhost:3000/api/vacations', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vaca)
    });
    const content = await r.json();
  }
}

const addVac = connect(null, mapDispatchToProps)(AddVac);
export default addVac;
