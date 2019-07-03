import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Allvac from './AllVac';
import AddVac from './AddVac';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';


class RouterAdmin extends Component {
  
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
        <Router>
                    <div>
                        <ul>
                        <li>
                                <Link to="/vacations">All Vaca</Link>
                            </li>
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                            <li>
                                <Link to="/addvacation">Add Vaca</Link>
                            </li>
                        </ul>

                       
                        <Route path='/vacations' render={(props) => 
                        <Allvac {...props}/>}/>

                        <Route path='/addvacation' render={(props) => 
                        <AddVac {...props}/>}/>

                        <Route path='/logout' render={(props) => <Login {...props} />}/>

                        

                    </div>
                </Router>
       
           
               
                <Footer/>
           
        </div>
    </div>
    );
  }
}



export default RouterAdmin;
