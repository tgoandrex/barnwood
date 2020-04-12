import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useID, useAdmin } from "../../context/auth";
import { Card, ListGroup } from "react-bootstrap";
import axios from "axios";

function ProductDetails(props) {
    const [isError, setIsError] = useState(false);
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [messages, setMessages] = useState([]);
    const { IDTokens } = useID();
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
    }, [props, IDTokens]);

    const Message = props => (
        <Card>
            <Card.Body>
                <Card.Title>
                    {props.message.owner.username === "(User removed)" ? (
                        <span>{props.message.owner.username}</span>
                    ) : (
                        <Link to={`/users/${props.message.owner.id}`}>{props.message.owner.username}</Link>                        
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
        return messages.map(function(currentMessage, i) {
            return <Message message={currentMessage} key={i} />;
        })
    }

    return (
        <div className="text-center">
            <h2>Products Details</h2>
                <Card>
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item>Name: {name}</ListGroup.Item>
                            <ListGroup.Item>Description: {description}</ListGroup.Item>
                            <ListGroup.Item>Price: ${price.toFixed(2)}</ListGroup.Item>
                            <ListGroup.Item>Stock: {stock}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            <Link to={`/products/list/${id}/messages/new`}>Questions or Comments Regarding this Product? Leave a Message.</Link>
            <h3>Messages: </h3>
            {messages.length > 0 ? (
                messageList()
            ) : (
                <p>(No messages)</p>
            )}
            { isError &&<p>Something went wrong with getting the product!</p> }
        </div>
    )
}

export default ProductDetails;