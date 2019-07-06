import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';


class AdminEdit extends Component {
  constructor(props) {
    super(props)

    console.log(this);
    console.log(props);
  }

  state = {
    id: this.props.match.params.id,
    vaca: this.props.vacationsArray[1]
  }

  componentDidMount() {
    this.props.vacationsArray;
  }

  render() {
    return (
      <div className="form">
        <input name="destination" value={this.props.vacationsArray.destination} onChange={this.handleChange.bind(this)} placeholder="name" />
        <input name="desc" onChange={this.handleChange.bind(this)} placeholder="desc" />
        <input name="price" onChange={this.handleChange.bind(this)} placeholder="price" />
        <input type="date" name="checkin" onChange={this.handleChange.bind(this)} placeholder="check-in" />
        <input type="date" name="checkout" onChange={this.handleChange.bind(this)} placeholder="check-out" />
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
  return async function (dispatch) {
    let vid = this.state.id;
    let r = await fetch(`http://localhost:3000/api/vacations/${vid}`, {
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