import React, { Component } from 'react';
import '../assets/W3.css'
import '../assets/style.css'
const url="anh.html"


class Footer extends Component {
  render() {
    return (
        <div className="w3-container w3-blue w3-padding-24" style={{marginTop: 30 +'px'}}>
        <div style={{maxWidth: 1250 +'px', marginLeft: 'auto', marginRight: 'auto'}}>
            <div className="w3-row-padding">
                <div className="w3-third w3-container">
                    <ul className="w3-ul">
                        <li><h5><b>CONTACT US</b></h5></li>
                        <li>123 Broadway, NY</li>
                        <li>(08)38383838</li>
                        <li><a href="mailto:championsport@gmail.com?subject=Feedback">championsport@gmail.com</a></li>
                    </ul>   
                </div>
                <div className="w3-third w3-container">
                    <ul className="w3-ul">
                        <li><h5><b>SOCIAL</b></h5></li>
                        <li>
                            <a href={url} ><button className="w3-btn w3-dark-grey"><span className="fa fa-facebook-square w3-xlarge"></span></button></a>
                            <a href={url}><button className="w3-btn w3-dark-grey"><span className="fa fa-twitter-square w3-xlarge"></span></button></a>
                            <a href={url}><button className="w3-btn w3-dark-grey"><span className="fa fa-google-plus-square w3-xlarge"></span></button></a>
                            <a href={url}><button className="w3-btn w3-dark-grey"><span className="fa fa-instagram w3-xlarge"></span></button></a>
                            <a href={url}><button className="w3-btn w3-dark-grey"><span className="fa fa-youtube-square w3-xlarge"></span></button></a>
                        </li>
                    </ul>
                </div>
                <div className="w3-third w3-container">
                    <ul className="w3-ul">
                        <li><h5><b>CHAMPION SPORT NEWSLETTER</b></h5></li>
                        <li>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default Footer;
