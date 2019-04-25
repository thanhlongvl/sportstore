import React, { Component } from 'react';
import '../assets/W3.css'
import '../assets/style.css'
const url="anh.html"

class Sidebar extends Component {
  render() {
    return (
        <div className="w3-col w3-card-8" style={{width: 22 +'%'}}>
            <ul className="w3-ul w3-blue side-menu">
                <li className="w3-border-bottom w3-border-top"><a href={url} className="pd-name w3-xlarge w3-padding w3-hover-orange"><span className="fa fa-home"></span>&nbsp;<b>HOME</b></a></li>
                <li className="w3-border-bottom"><a href={url} className="pd-name w3-padding w3-hover-orange"><b style={{marginLeft: 0 +'px'}}>PRODUCT</b></a>
					<ul className="w3-ul side-menu w3-light-blue">
						<li className="w3-border-bottom"><a href={url} className="pd-name w3-padding w3-hover-orange">Shoes</a></li>
						<li className="w3-border-bottom"><a href={url} className="pd-name w3-padding w3-hover-orange">Apparel</a></li>					
					</ul>
                </li>
                <li className="w3-border-bottom"><a href={url} className="pd-name w3-padding w3-hover-orange"><b style={{marginLeft: 0 +'px'}}>ORDER</b></a>
					<ul className="w3-ul side-menu w3-light-blue">
                        <li className="w3-border-bottom "><a href={url} className="pd-name w3-padding w3-hover-orange w3-orange">Shoes</a></li>
                        <li className="w3-border-bottom "><a href={url} className="pd-name w3-padding w3-hover-orange">Apparel</a></li>
                    </ul>
                </li>
                <li className="w3-boder-bottom"><a href={url} className="pd-name w3-padding w3-hover-orange"><b style={{marginLeft: 0 +'px'}}>RUNNING/GYM</b></a>
					<ul className="w3-ul side-menu w3-light-blue">
                        <li className="w3-border-bottom "><a href={url} className="pd-name w3-padding w3-hover-orange">Shoes</a></li>
                        <li className="w3-border-bottom "><a href={url} className="pd-name w3-padding w3-hover-orange">Apparel</a></li>
                    </ul>
				</li>
                <li className="w3-boder-bottom"><a href={url} className="pd-name w3-padding w3-hover-orange"><b style={{marginLeft: 0 +'px'}}>BAGS and BACKPACKS</b></a></li>
            </ul>
        </div>
    );
  }
}

export default Sidebar;
