import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Col, Form, Table } from "react-bootstrap";
import axios from "axios";

function UserList(props) {
    const [isError, setIsError] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activePage, setActivePage] = useState(1);
    const usersPerPage = 10;
    const indexOfLastUser = activePage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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
        if(searchTerm) {
            return users.filter(user => user.username.includes(searchTerm)).map((currentUser, i) => {
                return <User user={currentUser} key={i} />;
            });
        } else {
            return currentUsers.map(function(user, i) {
                return <User user={user} key={i} />;
            })
        }
    }

    function handlePageChange(pageNumber) {
        setActivePage(pageNumber);
    }

    return (
        <div className="text-center">
            <h2>Users List</h2>
            <Form>
                <Form.Row className="justify-content-sm-center">
                    <Form.Group as={Col} sm={{ span: 6 }}>
                        <Form.Label htmlFor="formSearch">Search Users</Form.Label>
                        <Form.Control
                                    controlid="formSearch"
                                    type="text"
                                    value={searchTerm}
                                    onChange={e => {
                                        setSearchTerm(e.target.value);
                                    }}
                                    placeholder="Username (case sensitive)"
                                    />
                    </Form.Group>
                </Form.Row>
            </Form>
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
            {!searchTerm && users.length > usersPerPage ? (
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={usersPerPage}
                    totalItemsCount={users.length}
                    pageRangeDisplayed={3}
                    onChange={handlePageChange.bind(this)}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            ) : (
                <span></span>
            )}
            { isError &&<p>Something went wrong with getting the users!</p> }
        </div>
    )
}

export default UserList;