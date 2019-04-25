import React, { Component } from 'react';
import '../assets/W3.css';
import '../assets/style.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class OrderItem extends Component {
    onDelete = (id) => {
        if(confirm('Do you want delete?')){ //eslint-disable-line
            this.props.onDelete(id);
        }
    }
    render() {
        var { orderitem, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{orderitem.customer.name}</td>
                <td>{orderitem.date}</td>
                <td>${orderitem.total}</td>
                <td>
                    {this.showstatus(orderitem.status)}
                </td>
                <td className="w3-text-gray">
                    <Link to={`/orderitem/${orderitem.id}`}>
                        <Button variant="outline-success" style={{marginRight: 10+'px'}}>Detail</Button>
                    </Link>
                    <Button variant="outline-danger" onClick={ () => this.onDelete(orderitem.id) }>Delete</Button>
                </td>
            </tr>
            
        );
    }
    showstatus(status) {
        if (status === true) {
            return (
                <select className="w3-select" name="option" style={{ width: 125 + 'px' }}>
                    <option key="1" value="1" disabled defaultValue>Delivered</option>
                    <option key="2" value="2">Not delivery</option>
                </select>
            );
        }
        else {
            return (
                <select className="w3-select" name="option" style={{ width: 125 + 'px' }}>
                    <option className="1">Delivered</option>
                    <option className="2" disabled defaultValue>Not delivery</option>
                </select>
            )
        }
    }
}

export default OrderItem;
