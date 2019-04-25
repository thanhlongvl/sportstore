import React, { Component } from 'react';
import '../assets/W3.css'
import '../assets/style.css'

class OrderDetailItem extends Component {
    render() {
        var { orderitem, index } = this.props;
        return (
            <tr>
                <td>{index+1}</td>
                <td>{orderitem.id}</td>
                <td>{ orderitem.product.name }</td>
                <td>{orderitem.price}</td>
                <td>{orderitem.quatity}</td>
                <td>{orderitem.amount}</td>
            </tr>
        );
    }

}

export default OrderDetailItem;
