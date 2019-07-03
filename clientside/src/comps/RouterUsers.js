import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Allvac from './AllVac';
import AddVac from './AddVac';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';


class RouterUsers extends Component {
  
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
                              <Link to="/login">Login</Link>
                          </li>
                          <li>
                              <Link to="/register">Register</Link>
                          </li>
                      </ul>

                      
                      <Route path='/vacations' render={(props) => 
                      <Allvac {...props}/>}/>

                      <Route path='/login' render={(props) => <Login {...props} 
                      history={this.props.history}/>}/>
                      <Route path='/register' render={(props) => <Register {...props} />}/>

                      

                  </div>
              </Router>
       
           
               
                <Footer/>
    
        </div>
    </div>
    );
  }
}



export default RouterUsers;
