import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Form, Button, Accordion, Card, ListGroup } from "react-bootstrap";
import axios from "axios";

function UserDelete(props) {
    const [ userIsDeleted, setUserIsDeleted ] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState("");
    const [ createdAt, setCreatedAt ] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:4000/users/${props.match.params.id}`)
        .then(res => {
            setUsername(res.data.user.username);
            setCreatedAt(res.data.user.createdAt);
        }).catch(function (err) {
            setIsError(true);
        })
    }, [props]);

    function postUser() {
        const userToDelete = {
            username: username,
            createdAt: createdAt
        };

        axios.delete(`http://localhost:4000/users/${props.match.params.id}`,
        userToDelete
        ).then(res => {
            if (res.status === 200) {
                console.log(res.data);
                setUserIsDeleted(true);
            } else {
                setIsError(true);
            }
        }).catch(err => {
            setIsError(true);
        });
    }

    if(userIsDeleted) {
        return <Redirect to={"/users"} />;
    }

    return (
        <div className="text-center">
            <h2>Delete User: {username}</h2>
            <Form style={{ marginTop: 20 }}>
                <p>Are you sure? Once a user is deleted, it cannot be reversed.</p>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                User Info
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item>Username: {username}</ListGroup.Item>
                                    <ListGroup.Item>Created At: {createdAt}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Button onClick={postUser} variant="danger">Delete User</Button>
            </Form>
            { isError &&<p>Something went wrong with deleting the user!</p> }
        </div>
    )
}

export default UserDelete;