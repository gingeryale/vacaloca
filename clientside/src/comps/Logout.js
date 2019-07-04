import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';

const LOGOUT = 'USER_LOGOUT'; // action type

function logout() { // redux action
  return (dispatch) => {
    dispatch({ type: USER_LOGOUT });
    return fetch('/logout', { method: 'POST' })
      .then(() => dispatch({ type: USER_LOGOUT, error: false }))
      .catch(error => dispatch({ type: USER_LOGOUT, payload: error, error: true }))
  }
  export default LOGOUT;



  
// class Logout extends Component {
  
//   render() {
//     return (
//       <div className="App">
//         <span onClick={this.props.logout.bind(this)}>logout</span>
//       </div>
//     );
//   }
// }


// function mapDispatchToProps(dispatch){
//     return{
//         logout: function(){
//         return dispatch(destorySession())
//       }
//     }
//   }
  
//   function destorySession() {
//     return async function(dispatch){
//       debugger;
//         let r = await fetch('http://localhost:3000/api/users/logout');
//         let jsonDATA = await r.json();
//         dispatch({type:"LOGOUT", data: jsonDATA});
//       }
//   }
  
//   const logout = connect(null, mapDispatchToProps)(Logout);
//   export default logout;
  
  
//    case 'LOGOUT':
//                 newState={isLoggedIn:false}
//             return newState;
