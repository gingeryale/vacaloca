import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';


class AVac extends Component {
  render() {
    return (
      <div className="vaca">
        <div>
          <button onClick={this.gotovaca.bind(this)}>Edit</button>
          <button id={this.props.vac.id} onClick={this.props.deleteV.bind(this)}>Delete {this.props.vac.id}</button>
          <span vid={this.props.vac.id}>Follow</span>
        </div>
        <h5>{this.props.vac.vac_destination}</h5>
        <p>{this.props.vac.vac_desc}</p>
        <p>{this.props.vac.vac_checkin}</p>
        <p>{this.props.vac.vac_checkout}</p>
        <p>{this.props.vac.vac_price}</p>
       
      </div >

    );
  }
  gotovaca() {
    this.props.naviEdit('/vacations/' + this.props.vac.id);
  }

}

function mapDispatchToProps(dispatch) {
  return {
    deleteV: function (ev) {
      return dispatch(delVacaFromServer(ev))
    }
  }
}

function delVacaFromServer(ev) {
  let delid = ev.target.id;
  return async function (dispatch) {
    let r = await fetch(`http://localhost:3000/api/vacations/${delid}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const content = await r.json();
    if(content.msg=='OK'){
      alert('deleted');
    }
    dispatch({ type: "DELETE_V", data: delid });
  }
}

const aVac = connect(null, mapDispatchToProps)(AVac);
export default aVac;