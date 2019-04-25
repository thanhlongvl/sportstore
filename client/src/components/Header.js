import React, { Component } from 'react';
import '../assets/W3.css';
import '../assets/style.css';
import { Link } from 'react-router-dom';
const url = "anh.html";


class Header extends Component {
  render() {
    return (
      <div className="top-menu">
        <ul className="w3-container w3-blue w3-medium w3-border-bottom w3-ul top-menu">
          <li className="w3-wide w3-large w3-left" style={{ marginTop: 10 + 'px', marginLeft: 7 + 'px' }}><b>Champion sport</b></li>
          <li className="w3-right w3-border-left w3-padding-0">
            <Link to={url} className="fa fa-shopping-cart w3-xlarge w3-hover-white w3-padding" ></Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
