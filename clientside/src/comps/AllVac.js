import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import AVac from "./AVac";

class AllVac extends Component {
  componentDidMount() {
    this.props.loadVacs();
  }

  componentWillReceiveProps() {
    this.props.allVacProps;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p>time: {this.props.dateprops.toLocaleString()}</p>
        </div>
        <div className="vcontain">
          {this.props.allVacProps.map(v => (
            <AVac vac={v} key={v.id} naviEdit={this.props.history.push} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    dateprops: state.date,
    allVacProps: state.allVac,
    followprops: state.following,
    loginState: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadVacs: () => {
      dispatch(loadAllVacsFromServer());
    }
  };
};

// download all server vacations
function loadAllVacsFromServer() {
  return async function(dispatch) {
    let r = await fetch("http://localhost:3000/api/users/show");
    let jsonDATA = await r.json();
    dispatch({ type: "GET_VACS", data: jsonDATA });
  };
}

const allvac = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllVac);
export default allvac;
