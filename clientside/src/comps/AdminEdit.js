import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';


class AdminEdit extends Component {

  state={
    cc:this.props.vacationsArray[this.props.match.params.vid-1]
  }
 
  componentDidMount() {
    this.props.vacationsArray;
  }
 


  render() {
    return (
      <div >
      <div className="form">
        <input name="destination" placeholder={this.state.cc.vac_destination} onChange={this.handleChange.bind(this)} />
        <input name="desc" placeholder={this.state.cc.vac_desc} onChange={this.handleChange.bind(this)}  />
        <input name="price" placeholder={this.state.cc.vac_price} onChange={this.handleChange.bind(this)}  />
        <input type="date" placeholder={this.state.cc.vac_checkin} name="checkin" onChange={this.handleChange.bind(this)}  />
        <input type="date" placeholder={this.state.cc.vac_checkout} name="checkout" onChange={this.handleChange.bind(this)}  />
        <button onClick={this.inputCheck.bind(this, this.state)}>Edit</button>
        <p>Date updates will be saved but not displayed in field</p>

      </div>
</div>
    );
  }

  //value={this.state.isFocused ? this.state.inputValue : selected_id}
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  inputCheck(vaca){
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
    alert("sent");

  }
}

const adminEdit = connect(mapStateToProps, mapDispatchToProps)(AdminEdit);
export default adminEdit;

