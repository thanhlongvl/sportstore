import React, { Component } from 'react';
import ListOrderDetail from '../components/ListOrderDetail';
import OrderDetailItem from '../components/OrderDetailItem';
const fetch = require('node-fetch');

class OrderDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderdetail: [],
      order: "",
      customer: "",
    };
  }
  componentDidMount() {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query GetOrder($id: Int!){
          orderbyid(id: $id){
            id
            total
            status
            date
            customer{
              name
              phonenumber
            }
            orderdetails {
              id
              quatity
              price
              amount
              product{
                id
                name
              }
            }
          }
        }`,
        variables: { id: parseInt(this.props.match.params.order_id) }
      })
    }).then(res => res.json()).then(res => {
      //console.log(res.data.orderbyid.customer);
      this.setState({
        orderdetail: res.data.orderbyid.orderdetails,
        order: res.data.orderbyid,
        customer: res.data.orderbyid.customer
      });
    }).catch(err => {
      console.log(err);
    });
  }
  render() {
    var { orderdetail, order, customer } = this.state;
    //console.log(order.customer);
    return (
      <ListOrderDetail order={order} customer={customer}>
        {this.showOrderDetailItem(orderdetail)}
      </ListOrderDetail>
    );
  }
  showOrderDetailItem(orderdetail) {
    var result = null;
    if (orderdetail.length > 0) {
      result = orderdetail.map((orderitem, index) => {
        return (
          <OrderDetailItem
            key={index}
            orderitem={orderitem}
            index={index}
          />
        );
      });
    }
    return result;
  }
}

export default OrderDetailPage;
