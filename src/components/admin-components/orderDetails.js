import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Card, ListGroup, Button } from "react-bootstrap";
import axios from "axios";

function OrderDetails(props) {
    const [orderIsCompleted, setOrderIsCompleted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [status, setStatus] = useState("");
    const [transaction, setTransaction] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:4000/orders/${props.match.params.id}`)
        .then(res => {
            setStatus(res.data.order.status);
            setTransaction(res.data.transaction);
        }).catch(function(err) {
            setIsError(true);
        })
    }, [props]);

    function postOrder() {
        axios.put(`http://localhost:4000/orders/${props.match.params.id}`,
        ).then(res => {
            if(res.status === 200) {
                console.log(res.data);
                setOrderIsCompleted(true);
            } else {
                setIsError(true);
            }
        }).catch(err => {
            setIsError(true);
        });
    }

    if(orderIsCompleted) {
        return <Redirect to={"/orders"} />;
    }

    return (
        <div className="text-center">
            <h2>Order Details</h2>
                <Card>
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item>Status: {status}</ListGroup.Item>
                            <ListGroup.Item>Transaction details: {JSON.stringify(transaction.details)}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
                {status !== "Completed" && <Button onClick={postOrder} variant="success">Complete Order</Button>}
            { isError &&<p>Something went wrong with getting the order!</p> }
        </div>
    )
}

export default OrderDetails;