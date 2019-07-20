import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import { Bar } from 'react-chartjs-2';
 


class Charts extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
  }

  componentDidMount() {
    debugger;
    this.props.chartsServer();
  }

  componentWillReceiveProps(){
    debugger;
    this.props.reportsProps
  }

  render() {
    debugger;
  let alldata = this.props.reportsProps;
  console.log(alldata);

  let data = {
    labels: alldata.map(v=>{ return v.vac_destination}),
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: alldata.map(v=>{ return v.trending})
      }
    ]
  };
    return (
      <div>
        <Bar
  data={data}
  width={100}
  height={350}
  options={{ maintainAspectRatio: false }}
/>
      </div>
    );
  }
}


const mapStateToProps = function (state) {
  debugger;
  return { allVacProps: state.allVac, reportsProps: state.reports, isAdmin: state.isAdmin };
}

const mapDispatchToProps = (dispatch) => {
  return {
    chartsServer: () => {dispatch(loadSubsFromServer())}
  };
};

// chart data
function loadSubsFromServer() {
  return async function (dispatch) {
    let r = await fetch('http://localhost:3000/api/users/subs/report');
    debugger;
    let chartData = await r.json();
    console.log(chartData);
    dispatch({ type: "CHARTS", data: chartData });
  }
}

const cHarts = connect(mapStateToProps, mapDispatchToProps)(Charts);
export default cHarts;
