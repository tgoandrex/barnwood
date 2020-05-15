import React, { useState, useEffect } from "react";
import { useID, useAdmin } from "../../context/auth";
import Pagination from "react-js-pagination";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import axios from "axios";

function UserDetails(props) {
    const [isError, setIsError] = useState(false);
    const [id, setID] = useState("");
    const [username, setUsername] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [messages, setMessages] = useState([]);
    const [orders, setOrders] = useState([]);
    const { IDTokens } = useID();
    const { adminTokens } = useAdmin();

    // Pagination variables Products
    const [activePageProducts, setActivePageProducts] = useState(1);
    const messagesPerPage = 10;
    const indexOfLastMessage = activePageProducts * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

    // Pagination variables Orders
    const [activePageOrders, setActivePageOrders] = useState(1);
    const ordersPerPage = 3;
    const indexOfLastOrder = activePageOrders * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const Message = props => (
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>{props.message.content}</ListGroup.Item>
            </ListGroup>
        </Card>
    )

    const Order = props => (
        <Card>
                <Card.Header>{props.order.status} Order</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Product Name: {props.order.product.name}</ListGroup.Item>
                    <ListGroup.Item>Product Price: ${props.order.product.price.toFixed(2)}</ListGroup.Item>
                    <ListGroup.Item>Product Quantity: {props.order.product.quantity}</ListGroup.Item>
                    <ListGroup.Item>Order Total: ${props.order.total.toFixed(2)}</ListGroup.Item>
                </ListGroup>
        </Card>
    )

    useEffect(() => {
        axios.get(`http://localhost:4000/users/${props.match.params.id}`)
        .then(res => {
            setID(res.data.user._id)
            setUsername(res.data.user.username);
            setIsAdmin(res.data.user.isAdmin);
            setMessages(res.data.messages);
            setOrders(res.data.orders);
        }).catch(function(err) {
            setIsError(true);
        })
    }, [props]);

    function messageList() {
        return currentMessages.map(function(message, i) {
            return <Message message={message} key={i} />;
        })
    }

    function orderList() {
        return currentOrders.map(function(order, i){
            return <Order order={order} key={i} />;
        })
    }

    function handlePageChangeProducts(pageNumber) {
        setActivePageProducts(pageNumber);
    }

    function handlePageChangeOrders(pageNumber) {
        setActivePageOrders(pageNumber);
    }

    return (
        <div className="text-center">
            <h2>{username} {isAdmin ? ( "(Admin)" ) : ( "(User)" )}</h2>
            <Row>
                <Col md={{ span: 6 }}>
                    <h3>Active Messages</h3>
                    <div>
                        {messageList()}
                        {messages.length > messagesPerPage &&
                            <Pagination
                                activePage={activePageProducts}
                                itemsCountPerPage={messagesPerPage}
                                totalItemsCount={messages.length}
                                pageRangeDisplayed={3}
                                onChange={handlePageChangeProducts.bind(this)}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        }
                    </div>
                </Col>
                <Col md={{ span: 6 }}>
                    <h3>Active Orders</h3>
                    {orders.length > 0 ? (
                        IDTokens === id || adminTokens ? (
                            <div>
                                {orderList()}
                                {orders.length > ordersPerPage &&
                                    <Pagination
                                        activePage={activePageOrders}
                                        itemsCountPerPage={ordersPerPage}
                                        totalItemsCount={orders.length}
                                        pageRangeDisplayed={3}
                                        onChange={handlePageChangeOrders.bind(this)}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                }
                            </div>
                        ) : (
                            <p>(You do not have access to this user's orders)</p>
                        )
                    ) : (
                        <p>(No active orders)</p>
                    )}
                </Col>
            </Row>
            { isError &&<p>Something went wrong with getting the user details!</p> }
        </div>
    )
}

export default UserDetails;