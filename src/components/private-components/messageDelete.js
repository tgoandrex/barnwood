import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function MessageDelete(props) {
    const [messageIsDeleted, setMessageIsDeleted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [content, setContent] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:4000/messages/${props.match.params.message_id}`)
        .then(res => {
            setContent(res.data.content);
        }).catch(function (err) {
            console.log(err);
        })
    }, [props]);

    function postMessage() {
        const productID = props.match.params.product_id;

        axios.delete(`http://localhost:4000/messages/${props.match.params.message_id}`,
            { data: {productID} }
        ).then(res => {
            if (res.status === 200) {
                console.log(res.data);
                setMessageIsDeleted(true);
            } else {
                setIsError(true);
            }
        }).catch(err => {
            setIsError(true);
        });
    }

    if(messageIsDeleted) {
        return <Redirect to={`/products/list/${props.match.params.product_id}`} />;
    }

    return (
        <div className="text-center">
            <h2>Delete Message</h2>
            <Form style={{ marginTop: 20 }}>
                <p>Are you sure? Deleted messages cannot be recovered.</p>
                <p>Message: {content}</p>
                <Button onClick={postMessage} variant="danger">Delete Message</Button>
            </Form>
            { isError &&<p>Something went wrong with deleting the message!</p> }
        </div>
    )
}

export default MessageDelete;