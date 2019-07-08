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
        <input type="date" placeholder={this.state.cc.vac_checkin} name="checkin" onChange={this.handleChange.bind(this)}  />
        <input type="date" name="checkout" placeholder={this.state.cc.vac_checkout} onChange={this.handleChange.bind(this)}  />
        <button onClick={this.props.saveData.bind(this, this.state)}>Add</button>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
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
  debugger;
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