import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Allvac from './comps/AllVac';
import AddVac from './comps/AddVac';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to VacationState</h2>
        </div>
        <AddVac />
        <Allvac />
      </div>
    );
  }
}

export default App;
