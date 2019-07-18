import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';


class AVac extends Component {
  render() {
      let buttons;
      if(this.props.isAdmin==true){
        buttons = <div>
         <button onClick={this.gotovaca.bind(this)}>Edit</button>
          <button id={this.props.vac.id} onClick={this.props.deleteV.bind(this)}>Delete {this.props.vac.id}</button>
        </div>
      } else if (this.props.isAdmin==false){
        buttons =<button data-id={this.props.vac.id} onClick={this.props.follow.bind(this)} vid={this.props.vac.id}>Follow</button>
      }
    return (
      <div className="vaca">
        <div>
         {buttons}
          
        </div>
        <h5>{this.props.vac.vac_destination}</h5>
        <p>{this.props.vac.vac_desc}</p>
        <p>{this.props.vac.vac_checkin}</p>
        <p>{this.props.vac.vac_checkout}</p>
        <p>{this.props.vac.vac_price}</p>
        <p><img src={this.props.vac.vac_img}/></p>
       
      </div >

    );
  }
  gotovaca() {
    this.props.naviEdit('/vacations/' + this.props.vac.id);
  }

}

const mapStateToProps = function (state) {
  return { isAdmin: state.isAdmin };
}

const mapDispatchToProps = dispatch => {
  return {
    deleteV: (ev) => {dispatch(delVacaFromServer(ev))},
    follow: (ev) => {dispatch(followVacationServer(ev))}
  };
};

function followVacationServer(ev) {
  let fvid = ev.target.dataset.id;
  return async function (dispatch) {
    let r = await fetch(`http://localhost:3000/api/users/subs/${fvid}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const content = await r.json();
    if(content.msg=='OK'){
      alert('following');
    }
    dispatch({ type: "FOLLOW_V", data: fvid });
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

const aVac = connect(mapStateToProps, mapDispatchToProps)(AVac);
export default aVac;