import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Col, Form, Button } from "react-bootstrap";

function Register(props) {
    const [isRegistered, setRegister] = useState(false);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function postRegister() {
        axios.post("http://localhost:4000/users/add", {
            username,
            password
        }).then(res => {
            setRegister(true);
        })
    }

    if(isRegistered) {
        return <Redirect to={"/"} />;
    }

    return (
        <div className="text-center">
            <h2>Register</h2>
            <Form>
                <Form.Row className="justify-content-sm-center">
                    <Form.Group as={Col} sm={{ span: 6 }}>
                        <Form.Label htmlFor="formUsername">Username</Form.Label>
                        <Form.Control
                                    controlid="formUsername"
                                    type="text" 
                                    value={username}
                                    onChange={e => {
                                        setUserName(e.target.value);
                                    }}
                                    placeholder="Enter username"
                                    autoFocus
                                    />
                    </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-sm-center">
                    <Form.Group as={Col} sm={{ span: 6 }}>
                        <Form.Label htmlFor="formPassword">Password</Form.Label>
                        <Form.Control
                                    controlid="formPassword"
                                    type="password" 
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value);
                                    }}
                                    placeholder="Enter password"
                                    />
                    </Form.Group>
                </Form.Row>
                <Button onClick={postRegister} variant="success">Register</Button>
            </Form>
            <Link to="/login">Already have an account?</Link>
        </div>
    )
}

export default Register;