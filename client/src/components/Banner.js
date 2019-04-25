import React, { Component } from 'react';
import '../assets/W3.css'
import '../assets/style.css'
import logo from '../assets/banner/logo.png'
import homegif from '../assets/banner/homegif.gif';

class Banner extends Component {
  render() {
    return (
      <div className="w3-row">
        <div className="w3-third w3-center w3-padding-0">
          <a href={logo} id="top"><img src={logo} alt="logo" className="w3-image" height="250" width="340" style={{marginTop: 30+'px'}} /></a>
          <p className="w3-hide-medium w3-hide-small w3-xlarge" style={{marginBottom: 0+'px',marginTop: 2+'px'}}><b>Wear it. Taste it</b></p>
        </div>
        <div className="w3-rest"><img src={homegif} alt="gif" className="w3-image" width="875" height="350" /></div>
      </div>
    );
  }
}

export default Banner;
