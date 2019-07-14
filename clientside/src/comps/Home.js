import React from 'react';
import { Link } from "react-router-dom";


function Home({ location }) {
    return (
      <div className="App-header home">
        <h3>
         Welcome to Reactive Vacations
        </h3>
       
        <p><Link to="/login">Login</Link></p>
      </div>
    );
  }

export default Home;
