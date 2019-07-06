import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from "react-router-dom";
import Allvac from './AllVac';
import AddVac from './AddVac';
import Footer from './Footer';
import NoMatch from './404';
import Login from './Login';
import AdminEdit from './AdminEdit';



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
                  <Link to="/logout" onClick={logout}>Logout Link</Link>
                </li>
                <li>
                  <Link to="/addvacation">Add Vaca</Link>
                </li>
              </ul>

              <Switch>
                <Route excat path='/vacations' render={(props) =>
                  <Allvac {...props} />} />

                <Route excat path='/addvacation' render={(props) =>
                  <AddVac {...props} />} />
                <Route excat path='/login' render={(props) => <Login {...props} />} />

                <Route exact path='/vacations/:vid' render={(props) => <AdminEdit {...props} />} />

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
