import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useID, useUserName } from "../../context/auth";
import { Col, Form, Button } from "react-bootstrap";
import axios from "axios";

function MessageCreate(props) {
    const [messageIsCreated, setMessageIsCreated] = useState(false);
    const [isError, setIsError] = useState(false);
    const [content, setContent] = useState("");
    const { IDTokens } = useID();
    const { userNameTokens } = useUserName();

    function postMessage() {
        let messageToCreate = {
            content
        };

        messageToCreate.owner = {};
        messageToCreate.owner.id = IDTokens;
        messageToCreate.owner.username = userNameTokens;

        const productID = props.match.params.product_id;

        axios.post("http://localhost:4000/messages/add",
            {messageToCreate, productID}
        ).then(res => {
            if(res.status === 200) {
                console.log(res.data);
                setMessageIsCreated(true);
            } else {
                setIsError(true);
            }
        }).catch(err => {
            setIsError(true);
        });
    }

    if(messageIsCreated) {
        return <Redirect to={"/products/list"} />;
    }

    return (
        <div className="text-center">
            <h2>Create Message</h2>
            <Form>
                <Form.Row className="justify-content-sm-center">
                    <Form.Group as={Col} sm={{ span: 6 }}>
                        <Form.Label htmlFor="formContent">Message Content</Form.Label>
                        <Form.Control
                                    controlid="formContent"
                                    as="textarea" 
                                    rows="3" 
                                    onChange={e => {
                                        setContent(e.target.value);
                                    }}
                                    placeholder="Leave a message"
                                    />
                    </Form.Group>
                </Form.Row>
                <Button onClick={postMessage} variant="success">Create Message</Button>
                { isError &&<p>Something went wrong with creating the message!</p> }
            </Form>
        </div>
    )
}

export default MessageCreate;