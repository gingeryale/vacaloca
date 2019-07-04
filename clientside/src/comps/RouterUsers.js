import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Allvac from './AllVac';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import NoMatch from './404';
import AVac from './AVac';
import AdminEdit from './AdminEdit';


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

                     <Switch>
                      <Route path='/vacations' render={(props) => 
                      <Allvac {...props}/>}/>

                      <Route path='/login' render={(props) => <Login {...props} 
                      history={this.props.history}/>}/>
                      <Route path='/register' render={(props) => <Register {...props} />}/>
                      <Route component={AVac} />

                      <Route path='/edit' render={(props) => 
                        <AdminEdit {...props}/>}/>

                      <Route component={NoMatch} />
                </Switch>

                      

                  </div>
              </Router>
       
           
               
                <Footer/>
    
        </div>
    </div>
    );
  }
}

function logout(event) {
    event.preventDefault(); // prevent page transition
    fetch('http://localhost:3000/api/users/logout', { method: 'POST' }).then(() =>
      window.location.reload() // stay at the same url
    )
  }

export default RouterUsers;
