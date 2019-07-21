import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AVac from './AVac';
import AllVac from './AllVac';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import NoMatch from './404';
import Home from './Home';

class RouterUsers extends Component {
  
  render() {
    return (
        <div className="container-fluid">
        <div className="row">
            <Router>
                  <div>
                  <ul className="nav">
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/vacations">All Vaca</Link></li>
                      <li><Link onClick={this.logout.bind(this)} to="/login">logout</Link></li>
                      </ul>

                     <Switch>
                     <Route excat path='/vacations' render={(props) =>
                  <AllVac {...props} />} />

                     <Route path='/login' render={(props) => <Login {...props} 
                      history={this.props.history}/>}/>

                      <Route path='/register' render={(props) => <Register {...props} />}/>

                <Route exact path='/' render={(props) => <Home {...props}/>} />
                      <Route component={NoMatch} />
                </Switch>

                      

                  </div>
              </Router>
       
           
               
                <Footer/>
    
        </div>
    </div>
    );
  }
  logout() {
    window.location.replace('/');
  }
}


export default RouterUsers;
