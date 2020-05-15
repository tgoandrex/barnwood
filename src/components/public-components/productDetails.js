import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useID, useUserName, useAdmin } from "../../context/auth";
import Pagination from "react-js-pagination";
import { Card, ListGroup, Form, Col } from "react-bootstrap";
import axios from "axios";

import PayPalButton from "../paypalButton";

function ProductDetails(props) {
    const [isError, setIsError] = useState(false);
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [messages, setMessages] = useState([]);
    const { IDTokens } = useID();
    const [activePage, setActivePage] = useState(1);
    const messagesPerPage = 5;
    const indexOfLastMessage = activePage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);
    const { userNameTokens } = useUserName();
    const { adminTokens } = useAdmin();

    useEffect(() => {
        axios.get(`http://localhost:4000/products/${props.match.params.id}`)
        .then(res => {
            setID(res.data.product._id);
            setName(res.data.product.name);
            setDescription(res.data.product.description);
            setPrice(res.data.product.price);
            setStock(res.data.product.stock);
            setMessages(res.data.messages);
        }).catch(function(err) {
            setIsError(true);
        })
    }, [props]);

    const Message = props => (
        <Card>
            <Card.Body>
                <Card.Title>
                    {props.message.owner.username === "(User removed)" ? (
                        <span>{props.message.owner.username}</span>
                    ) : (
                        <Link to={`/users/${props.message.owner.id}/`}>{props.message.owner.username}</Link>
                    )}
                </Card.Title>
                <Card.Text>
                    {props.message.content}
                </Card.Text>
                {IDTokens === props.message.owner.id || adminTokens ? (
                    <span>
                        <Link to={`/products/list/${id}/messages/${props.message._id}/edit/`} style={{ marginRight: 10, marginLeft: 10 }}>
                            Edit
                        </Link>
                        <Link to={`/products/list/${id}/messages/${props.message._id}/delete/`}>Delete</Link>
                    </span>
                ) : (
                    <span></span>
                )}
            </Card.Body>
        </Card>
    )

    function messageList() {
        return currentMessages.map(function(message, i) {
            return <Message message={message} key={i} />;
        })
    }

    function handlePageChange(pageNumber) {
        setActivePage(pageNumber);
    }

    let productInfo = {
        id, name, description, price, quantity
    }

    return (
        <div className="text-center">
            <h2>Product Details</h2>
                <Card>
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item>Name: {name}</ListGroup.Item>
                            <ListGroup.Item>Description: {description}</ListGroup.Item>
                            <ListGroup.Item>Price: ${price.toFixed(2)}</ListGroup.Item>
                            <ListGroup.Item>Stock: {stock}</ListGroup.Item>
                        </ListGroup>
                        {stock > 0 && IDTokens ? (
                            <Form>
                                <h2>Order This Product</h2>
                                <p>
                                    (Please note these orders are only done in a Paypal sandbox environment,
                                    no real money is being charged)
                                </p>
                                <Form.Row>
                                    <Form.Group as={Col} sm={{ span: 6, offset: 3 }}>
                                        <Form.Label htmlFor="formQuantity">Quantity</Form.Label>
                                        <Form.Control
                                                    controlid="formQuantity"
                                                    type="number"
                                                    min="1"
                                                    max={stock}
                                                    step="1"
                                                    onChange={e => {
                                                        setQuantity(e.target.value);
                                                    }}
                                                    placeholder="Enter quantity to order"
                                                    />
                                    </Form.Group>
                                </Form.Row>
                                { quantity > 0 &&
                                    <PayPalButton 
                                        amount={price * quantity}
                                        productInfo={productInfo}
                                        username={userNameTokens}
                                        id={IDTokens}
                                    />
                                }
                            </Form>
                        ) : (
                            <div></div>
                        )}
                    </Card.Body>
                </Card>
            <Link to={`/products/list/${id}/messages/new`}>Questions or Comments Regarding this Product? Leave a Message.</Link>
            <h3>Messages: </h3>
            {messages.length > 0 ? (
                <div>
                    {messageList()}
                    {messages.length > messagesPerPage &&
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={messagesPerPage}
                            totalItemsCount={messages.length}
                            pageRangeDisplayed={3}
                            onChange={handlePageChange.bind(this)}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    }
                    </div>
            ) : (
                <p>(No messages)</p>
            )}
            { isError &&<p>Something went wrong with getting the product or placing the order!</p> }
        </div>
    )
}

export default ProductDetails;