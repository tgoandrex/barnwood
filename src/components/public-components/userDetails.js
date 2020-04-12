import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";

function UserDetails(props) {
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [messages, setMessages] = useState([]);

    const Message = props => (
        <Card>
            <Card.Body>
                <Card.Text>
                    {props.message.content}
                </Card.Text>
            </Card.Body>
        </Card>
    )

    useEffect(() => {
        axios.get(`http://localhost:4000/users/${props.match.params.id}`)
        .then(res => {
            setUsername(res.data.user.username);
            setIsAdmin(res.data.user.isAdmin);
            setMessages(res.data.messages);
        }).catch(function(err) {
            setIsError(true);
        })
    }, [props]);

    function messageList() {
        return messages.map(function(currentMessage, i){
            return <Message message={currentMessage} key={i} />;
        })
    }

    return (
        <div className="text-center">
            <h2>{username} {isAdmin ? ( "(Admin)" ) : ( "(User)" )}</h2>

            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>Active Messages</h3>
                    {messages.length > 0 ? (
                        messageList()
                    ) : (
                        <p>(No active messages)</p>
                    )}
                </Col>
            </Row>
            { isError &&<p>Something went wrong with getting the user!</p> }
        </div>
    )
}

export default UserDetails;