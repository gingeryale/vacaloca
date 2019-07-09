import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import AVac from './AVac';

class AllVac extends Component {

  componentDidMount() {
    this.props.loadVacas();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p>time now {this.props.dateprops.toLocaleString()}</p>
        </div>
        {this.props.allVacaProps.map(v => <AVac vac={v} key={v.id} naviEdit={this.props.history.push} />)}
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return { dateprops: state.date, allVacaProps: state.allVac, followprops: state.following };
}

function mapDispatchToProps(dispatch) {
  return {
    loadVacas: function () {
      return dispatch(loadAllVacasFromServer())
    }
  }
}

function loadAllVacasFromServer() {
  return async function (dispatch) {
    let r = await fetch('http://localhost:3000/api/vacations');
    let jsonDATA = await r.json();
    dispatch({ type: "GET_VACAS", data: jsonDATA });
  }
}
const allvac = connect(mapStateToProps, mapDispatchToProps)(AllVac);
export default allvac;
