import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import Allvac from './comps/AllVac';
import AddVac from './comps/AddVac';
import Login from './comps/Login';
import Register from './comps/Register';
import Footer from './comps/Footer';



class App extends Component {  
  
  render() {
    if(this.props.isLoggedIn){
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
                                <Link to="/Login">Logout</Link>
                            </li>
                            <li>
                                <Link to="/addvacation">Add Vaca</Link>
                            </li>
                        </ul>

                       
                        <Route path='/vacations' render={(props) => 
                        <Allvac {...props}/>}/>

                        <Route path='/addvacation' render={(props) => 
                        <AddVac {...props}/>}/>

                        <Route path='/login' render={(props) => <Login {...props} 
                        history={this.props.history}/>}/>

                        

                    </div>
                </Router>
       
           
               
                <Footer/>
           
        </div>
    </div>
      
             
      
      );
    }

    else {
      return(

        

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

}

const mapStateToProps = function(state){
  return {isLoggedIn:state.isLoggedIn};
}

const app = connect(mapStateToProps, null)(App);
export default app;
