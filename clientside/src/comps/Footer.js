import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';



function Footer() {
    return (
    
      <footer className="footer pt-2 text-muted text-center text-small dark">
      <p className="mb-1">© 2017-2018 JBH</p>
      <ul className="list-inline">
        <li className="list-inline-item"><a href="#">Privacy</a></li>
        <li className="list-inline-item"><a href="#">Terms</a></li>
        <li className="list-inline-item"><a href="#">Support</a></li>
      </ul>
    </footer>
     
    );
  }

export default Footer;