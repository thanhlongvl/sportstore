import React, { Component } from 'react';
import '../assets/W3.css'
import '../assets/style.css'
const url="anh.html"

class Product extends Component {
  render() {
      //console.log("my team");
      var { product } = this.props;
    return (
        <div className="w3-third w3-container">
            <img src={product.url_image} alt="best2" className="w3-image" />
            <div className="w3-bottommiddle w3-center">
                <a href={url} className="pd-name"><b className="w3-large">{product.name}</b></a><br/>
                <b className="w3-text-blue w3-xlarge">${product.export_price}</b>
            </div>
        </div>
    );
  }
}

export default Product;
