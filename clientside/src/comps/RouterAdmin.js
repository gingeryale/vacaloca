import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from "react-router-dom";
import {connect} from 'react-redux';
import AllVac from './AllVac';
import AddVac from './AddVac';
import Footer from './Footer';
import NoMatch from './404';
import Login from './Login';
import AdminEdit from './AdminEdit';
import Home from './Home';



class RouterAdmin extends Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Router>
            <div>
              <ul>
              <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/vacations">All Vacations</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/addvacation">Add Vaca</Link>
                </li>
              </ul>

              <Switch>
              <Route exact path='/vacations/:vid' render={(props) => <AdminEdit {...props}/>} />
              
              <Route path='/login' render={(props) => 
              <Login {...props} history={this.props.history}/>}/>

                <Route excat path='/vacations' render={(props) =>
                  <AllVac {...props} />} />

                <Route excat path='/addvacation' render={(props) =>
                  <AddVac {...props} />} />
               
                <Route exact path='/' render={(props) => <Home {...props}/>} />

                <Route component={NoMatch} />
              </Switch>


            </div>
          </Router>



          <Footer />

        </div>
      </div>
    );
  }
}
function logout(e) {
  e.preventDefault(); // prevent page transition
  fetch('http://localhost:3000/api/users/logout', { method: 'GET' }).then(() =>
    console.log('end'))
}


export default RouterAdmin;
