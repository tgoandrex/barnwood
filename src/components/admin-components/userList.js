import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import axios from "axios";

function UserList(props) {
    const [isError, setIsError] = useState(false);
    const [users, setUsers] = useState([]);

    const User = props => (
        <tr>
            <td>
                <Link to={`/users/${props.user._id}`}>{props.user.username}</Link>
            </td>
            <td>{props.user.createdAt}</td>
            <td>
                {!props.user.isAdmin && 
                    <Link to={`/users/${props.user._id}/delete/`}>Delete</Link>
                }
            </td>
        </tr>
    )

    useEffect(() => {
        axios.get("http://localhost:4000/users/")
            .then(res => {
                setUsers(res.data)
            }).catch(function(err) {
                setIsError(true);
            })
        }, []);

    function userList() {
        return users.map(function(currentUser, i){
            return <User user={currentUser} key={i} />;
        })
    }

    return (
        <div className="text-center">
            <h2>Users List</h2>
            <Table striped bordered style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    { userList() }
                </tbody>
            </Table>
            { isError &&<p>Something went wrong with getting the users!</p> }
        </div>
    )
}

export default UserList;