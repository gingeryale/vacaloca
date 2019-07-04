import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';


class AdminEdit extends Component {
  constructor(props){
    super(props)
    this.vid = props.vid;
    console.log(this);
    console.log(props);
  }
  state={
    id: this.props.vid
  }
  render() {
    return (
      <div className="form">
       <input name="destination" value={this.state.id} onChange={this.handleChange.bind(this)} placeholder="name"/>
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
    let r = await fetch(`http://localhost:3000/api/vacations/`, {
      method:'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vaca)
    });
    const content = await r.json();
  }
}

const adminEdit = connect(null, mapDispatchToProps)(AdminEdit);
export default adminEdit;


// async remover(){ 
//   let id = this.props.vic
//    console.log(id);
//    const responseData = await fetch(`http://localhost:3000/api/users/${id}`, {
//   method:'delete',
//   headers: {
//     'Accept':'application/json',
//     'Content-Type': 'application/json'
//   }
// });
// const content = await responseData.json();
// this.props.refresh();
// }