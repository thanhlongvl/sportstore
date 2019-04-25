import React, { Component } from 'react';
import '../assets/W3.css';
import '../assets/style.css';
import OrderItem from '../components/OrderItem';
const fetch = require('node-fetch');


class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }
    componentDidMount() {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ orders { id total status date customer{ name } } }' }),
        }).then(res => res.json()).then(res => {
            //console.log(res);
            this.setState({
                orders: res.data.orders
            });
        }).catch(err => {
            console.log(err);
        });
    }

    onDelete = (orderid) => {
        console.log(orderid);
        var { orders } = this.state;
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
                query: `mutation DeleteOrder($id: Int!){
                    deleteOrder(id: $id){
                      id
                    }
                  }`,
                variables: { id: parseInt(orderid) }
            })
        }).then(res => {
            console.log(res);    
            if (res.status === 200) {
                var index = this.findIndex(orders, orderid);
                if (index !== -1) {
                    orders.splice(index, 1);
                    this.setState({
                        orders: orders
                    });
                }
            }
        }).catch(err => {
            console.log(err);
        });
    }
    
    findIndex = (orders, id) => {
        var result = -1;
        orders.forEach((order, index) => {
            if (order.id === id) {
                result = index;
            }
        });
        return result;
    }

    render() {
        var { orders } = this.state;
        return (
            <div className="w3-rest w3-card-8" style={{ marginLeft: 23 + '%' }}>
                <h3 className="w3-center w3-text-indigo"><strong>The list order in the second quarter in 2016</strong></h3>
                <div className="w3-container">
                    <table className="w3-table-all">
                        <thead>
                            <tr className="w3-red">
                                <th>Order form ID</th>
                                <th>Customer name</th>
                                <th>Date order</th>
                                <th>Expense</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showOrderItem(orders)}
                        </tbody>
                    </table>
                </div>
                <br />
                <br />
            </div>
        );
    }
    showOrderItem(orders) {
        var result = null;
        if (orders.length > 0) {
            result = orders.map((orderitem, index) => {
                return (
                    <OrderItem
                        key={index}
                        orderitem={orderitem}
                        index={index}
                        onDelete={this.onDelete}
                    />
                );
            });
        }
        return result;
    }
}

export default OrderList;
