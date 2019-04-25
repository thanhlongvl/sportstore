import React, { Component } from 'react';
import '../assets/W3.css'
import '../assets/style.css'
import Product from '../components/Product'
const fetch = require('node-fetch')


class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products : []
        };
    }
    componentDidMount() {
        fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ products { id name export_price url_image} }' }),
      }).then(res => res.json()).then(res => {
          console.log(res);
          this.setState({
              products : res.data.products
          });
      }).catch(err => {
          console.log(err);
      });
    }
  render() {
    var { products } = this.state;
    return (
        <div className="w3-rest w3-card-8">
            <div className="w3-row-padding">
                {this.showProducts(products)}
            </div>
        </div>
    );
  }
  showProducts(products) {
    var result = null;
    if (products.length > 0) {
        result = products.map((product, index) => {
            return (
                <Product
                    key={index}
                    product={product}
                    index={index}
                />
            );
        });
    }
    return result;
}
}

export default Products;
