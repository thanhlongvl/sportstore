import React, { Component } from 'react';
import '../assets/W3.css';
import '../assets/style.css';

class ListOrderDetail extends Component {
    render() {
        var { order, customer } = this.props;
        return (
            <div className="w3-rest w3-card-8" style={{ marginLeft: 23 + '%' }}>
                <h2 className="w3-center w3-text-indigo"><strong>DETAILED ORDERS</strong></h2>
                <div className="w3-container w3-half ">
                    <h5>Order form ID: <strong>{order.id}</strong><br></br>Customer name: <strong>{customer.name}</strong></h5>
                </div>
                <div className="w3-container w3-half w3-right-align">
                    <h5>Date order: <strong>{order.date}</strong>
                        <br></br>
                        Status: { this.showstatus(order.status) }
                    </h5>
                </div>

                <div className="w3-container">
                    <table className="w3-table-all">
                        <thead>
                            <tr className="w3-red">
                                <th>#</th>
                                <th>Product ID</th>
                                <th>Product name</th>
                                <th>Price</th>
                                <th>Quatity</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.children}
                        </tbody>
                    </table>
                    <h3 className="w3-right-align"><strong>TOTAL:</strong> <span className="w3-text-red">${order.total}</span></h3>
                </div>
                <br></br>
            </div>
        );
    }
    showstatus(status) {
        if (status === true) {
            return (
                <strong style={{ color: 'green' }}>
                    <i>Delivered</i>
                </strong>
            )
        }
        else {
            return (
                <strong style={{ color: 'green' }}>
                    <i>Not Delivered</i>
                </strong>
            )
        }
    }
}

export default ListOrderDetail;
