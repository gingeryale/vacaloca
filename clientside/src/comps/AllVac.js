import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import AVac from './AVac';


class AllVac extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p>time now {this.props.dateprops.toLocaleString()}</p>
        </div>
       {this.props.allprops.map(v=> <AVac vac={v} key={v.id} />)}
      </div>
    );
  }
}

const mapStateToProps = function(state){
    return {dateprops: state.date, allprops:state.allVac, followprops:state.following};
}

const allvac = connect(mapStateToProps, null)(AllVac);
export default allvac;
