import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Col, Form, Button } from "react-bootstrap";
import axios from "axios";

function MessageEdit(props) {
    const [messageIsEdited, setMessageIsEdited] = useState(false);
    const [isError, setIsError] = useState(false);
    const [content, setContent] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:4000/messages/${props.match.params.message_id}`)
        .then(res => {
            setContent(res.data.content);
        }).catch(function(err) {
            setIsError(true);
        })
    }, [props]);

    function postMessage() {
        const updatedMessage = {
            content
        };

        axios.put(`http://localhost:4000/messages/${props.match.params.message_id}`,
            updatedMessage
        ).then(res => {
            if(res.status === 200) {
                console.log(res.data);
                setMessageIsEdited(true);
            } else {
                setIsError(true);
            }
        }).catch(err => {
            setIsError(true);
        });
    }

    if(messageIsEdited) {
        return <Redirect to={`/products/list/${props.match.params.product_id}`} />;
    }

    return (
        <div className="text-center">
            <h2>Edit Message</h2>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} sm={{ span: 12 }}>
                        <Form.Label htmlFor="formContent">Message Body</Form.Label>
                        <Form.Control
                                    controlid="formContent"
                                    type="text" 
                                    value={content}
                                    onChange={e => {
                                        setContent(e.target.value);
                                    }}
                                    autoFocus
                                    />
                    </Form.Group>
                </Form.Row>
                <Button onClick={postMessage} variant="warning">Edit Message</Button>
                { isError &&<p>Something went wrong with editing the message!</p> }
            </Form>
        </div>
    )
}

export default MessageEdit;