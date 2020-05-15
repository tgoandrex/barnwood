import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useAdmin, useUserName, useID } from "../../context/auth";
import { Col, Form, Button } from "react-bootstrap";

function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setUserNameTokens } = useUserName();
    const { setIDTokens } = useID();
    const { setAdminTokens } = useAdmin();

    /* referer is set up like this because originally going from a public route to login.js would crash with 
    "props.location.state is undefined"
    and using
    "const referer = props.location.state.referer || '/';" 
    would not work correctly */
    let referer;
    if(props.location.state !== undefined) {
        referer = props.location.state.referer;
    } else {
        referer = "/";
    }

    function postLogin() {
        axios.post("http://localhost:4000/users/login", {
            username, password
        }).then(res => {
            if (res.status === 200) {
                setUserNameTokens(res.data.username);
                setIDTokens(res.data._id);
                if(res.data.isAdmin === true) {
                    setAdminTokens(res.data.isAdmin);
                }
                setLoggedIn(true);
            } else {
                setIsError(true);
            }
        }).catch(err => {
            console.log(err)
            setIsError(true);
        });
    }

    if(isLoggedIn) {
        return <Redirect to={referer} />;
    }

    return (
        <div className="text-center">
            <h2>Login</h2>
            <Form>
                <Form.Row className="justify-content-sm-center">
                    <Form.Group as={Col} sm={{ span: 6 }}>
                        <Form.Label htmlFor="formUsername">Username</Form.Label>
                        <Form.Control
                                    controlid="formUsername"
                                    type="username"
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
                <Button onClick={postLogin} variant="success">Login</Button>
            </Form>
            <Link to="/register">Don't have an account?</Link>
            { isError &&<p>There was a problem logging in!</p> }
        </div>
    )
}

export default Login;