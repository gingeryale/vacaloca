import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';


class AddVac extends Component {
 
  render() {
    return (
      <div className="form">
        <input required name="destination" onChange={this.handleChange.bind(this)} placeholder="name" />
        <input required name="desc" onChange={this.handleChange.bind(this)} placeholder="desc" />
        <input required name="price" onChange={this.handleChange.bind(this)} placeholder="price" />
        <input required type="date" name="checkin" onChange={this.handleChange.bind(this)} />
        <input required type="date" name="checkout" onChange={this.handleChange.bind(this)} />
        <input type="file" name="img" onChange={this.handleImg.bind(this)} accept="image/*"/>
        <button onClick={this.props.saveData.bind(this, this.state)}>Add</button>
      </div>
    );
  }

  handleImg(e){
    let files = e.target.files;
    console.table("data file " +files);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload=(e)=>{
      var formData = {img:e.target.result};
      this.setState({ img: formData.img });
      console.log(this.state);
    }
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);

  }

}


function mapDispatchToProps(dispatch) {
  return {
    saveData: function (vaca) {
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
    dispatch({ type: "ADD_V", data: content });
    const content = await r.json();
    if(content.msg=='OK'){
      alert('added successfuly');
    }
  }
}

const addVac = connect(null, mapDispatchToProps)(AddVac);
export default addVac;
