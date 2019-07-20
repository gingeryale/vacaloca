import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import { Bar } from 'react-chartjs-2';
 


class Charts extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.chartsServer();
  }

  componentWillReceiveProps(){
    this.props.reportsProps
  }

  render() {
  let alldata = this.props.reportsProps;
  console.log(alldata);

  let data = {
    labels: alldata.map(v=>{ return v.vac_destination}),
    datasets: [
      {
        label: 'Top Trending Vacations',
        backgroundColor: 'rgb(131, 255, 226,0.3)',
        borderColor: 'rgba(50,50,50,.2)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(131, 255, 226,0.4)',
        hoverBorderColor: 'rgba(50,50,50,1)',
        data: alldata.map(v=>{ return v.trending})
      }
    ],
    
  };
    return (
      <div>
        <Bar
  data={data}
  width={100}
  height={350}
  options={{
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }}

/>
      </div>
    );
  }
}


const mapStateToProps = function (state) {
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
    let chartData = await r.json();
    console.log(chartData);
    dispatch({ type: "CHARTS", data: chartData });
  }
}

const cHarts = connect(mapStateToProps, mapDispatchToProps)(Charts);
export default cHarts;
