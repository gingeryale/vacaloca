import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';


class AdminEdit extends Component {
  constructor(props) {
    super(props);
    console.log(this);
    console.log(props);
    console.log(this.props.match.params.vid)
  }

  state={
    cc:this.props.vacationsArray[this.props.match.params.vid-1]
  }
 
  componentDidMount() {
    this.props.vacationsArray;
  }
 


  render() {
    return (
      <div className="form">
        <input name="destination" placeholder={this.state.cc.vac_destination} onChange={this.handleChange.bind(this)} />
        <input name="desc" placeholder={this.state.cc.vac_desc} onChange={this.handleChange.bind(this)}  />
        <input name="price" placeholder={this.state.cc.vac_price} onChange={this.handleChange.bind(this)}  />
        <input type="date" value={this.state.cc.vac_checkin} name="checkin" onChange={this.handleChange.bind(this)}  />
        <input type="date" value={this.state.cc.vac_checkout} name="checkout" onChange={this.handleChange.bind(this)}  />
        <button onClick={this.inputCheck.bind(this, this.state)}>Edit</button>
      </div>
    );
  }

  //value={this.state.isFocused ? this.state.inputValue : selected_id}
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  inputCheck(vaca){
    debugger;
    !vaca.price ? vaca.price = vaca.cc.vac_price : vaca.price=vaca.price;
    !vaca.destination ? vaca.destination = vaca.cc.vac_destination : vaca.destination=vaca.destination;
    !vaca.desc ? vaca.desc = vaca.cc.vac_desc : vaca.desc=vaca.desc;
    !vaca.checkin ? vaca.checkin = vaca.cc.vac_checkin : vaca.checkin=vaca.checkin;
    !vaca.checkout ? vaca.checkout = vaca.cc.vac_checkout : vaca.checkout=vaca.checkout;
    vaca.cc.id = this.props.match.params.vid;
    this.props.saveData(vaca);
  }

}

const mapStateToProps = function (state) {
  return { vacationsArray: state.allVac };
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
    let dc = vaca.cc.id;
    let r = await fetch(`http://localhost:3000/api/vacations/${dc}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vaca)
    });
    const content = await r.json();
  }
}

const adminEdit = connect(mapStateToProps, mapDispatchToProps)(AdminEdit);
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