import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Table, Form, Col } from "react-bootstrap";
import axios from "axios";

function OrderList(props) {
    const [isError, setIsError] = useState(false);
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activePage, setActivePage] = useState(1);
    const ordersPerPage = 10;
    const indexOfLastOrder = activePage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const Order = props => (
        <tr>
            <td><Link to={`/orders/${props.order._id}/`}>{props.order._id}</Link></td>
            <td><Link to={`/users/${props.order.owner.id}/`}>{props.order.owner.username}</Link></td>
            <td>{props.order.status}</td>
            <td>{props.order.createdAt}</td>
            <td>{props.order.product.name}</td>
            <td>${props.order.product.price.toFixed(2)}</td>
            <td>{props.order.product.quantity}</td>
            <td>${props.order.total.toFixed(2)}</td>
        </tr>
    )

    useEffect(() => {
        axios.get("http://localhost:4000/orders/")
        .then(res => {
            setOrders(res.data);
        }).catch(function(err) {
            setIsError(true);
        })
    }, []);

    function orderList() {
        if(searchTerm) {
            return orders.filter(order => order.owner.username.includes(searchTerm)).map((currentOrder, i) => {
                return <Order order={currentOrder} key={i} />;
            });
        } else {
            return currentOrders.map(function(order, i) {
                return <Order order={order} key={i} />;
            })
        }
    }

    function handlePageChange(pageNumber) {
        setActivePage(pageNumber);
    }

    return (
        <div className="text-center">
            <h2>Orders List</h2>
            <Form>
                <Form.Row className="justify-content-sm-center">
                    <Form.Group as={Col} sm={{ span: 6 }}>
                        <Form.Label htmlFor="formSearch">Search Orders by Username</Form.Label>
                        <Form.Control
                                    controlid="formSearch"
                                    type="text"
                                    value={searchTerm}
                                    onChange={e => {
                                        setSearchTerm(e.target.value);
                                    }}
                                    placeholder="Order Owner (case sensitive)"
                                    />
                    </Form.Group>
                </Form.Row>
            </Form>
            <Table striped bordered style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <td>ID</td>
                        <th>Owner</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th colSpan={3}>Product (Name, Price, Quantity)</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    { orderList() }
                </tbody>
            </Table>
            {!searchTerm && orders.length > ordersPerPage ? (
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={ordersPerPage}
                    totalItemsCount={orders.length}
                    pageRangeDisplayed={3}
                    onChange={handlePageChange.bind(this)}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            ) : (
                <span></span>
            )}
            { isError &&<p>Something went wrong with getting the orders!</p> }
        </div>
    )
}

export default OrderList;