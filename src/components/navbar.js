import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useID, useAdmin } from "../context/auth";

function Navigation(props) {
    const { IDTokens } = useID();
    const { adminTokens } = useAdmin();
    const styledNavLink = {
        textDecoration: "none",
        color: "#F5F5F5",
        marginLeft: "10px",
        marginTop: "5px"
    }
    const styledHeader = {
        textDecoration: "none",
        color: "#FFF",
        fontSize: "1.5em"
    }

    function adminNav() {
        return (
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/products" style={styledNavLink}>Product List</Link>
                    <Link to="/products/list" style={styledNavLink}>Product List (Public)</Link>
                    <Link to="/users" style={styledNavLink}>User List</Link>
                    <Link to="/orders" style={styledNavLink}>Order List</Link>
                </Nav>
                <Nav>
                    <Link to={`/users/${IDTokens}`} style={styledNavLink}>Profile</Link>
                    <Link to="/logout" style={styledNavLink}>Log Out</Link>
                </Nav>
            </Navbar.Collapse>
        )
    }

    function loggedInNav() {
        return (
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/products/list" style={styledNavLink}>Product List</Link>
                </Nav>
                <Nav>
                    <Link to={`/users/${IDTokens}`} style={styledNavLink}>Profile</Link>
                    <Link to="/logout" style={styledNavLink}>Log Out</Link>
                </Nav>
            </Navbar.Collapse>
        )
    }

    function guestNav() {
        return(
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/products/list" style={styledNavLink}>Product List</Link>
                </Nav>
                <Nav>
                    <Link to="/register" style={styledNavLink}>Register</Link>
                    <Link to="/login" style={styledNavLink}>Login</Link>
                </Nav>
            </Navbar.Collapse>
        )
    }

    return (
        <Navbar bg="primary" variant="dark" expand="md">
            <Link to="/" style={styledHeader}>Barnwood Site</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {IDTokens && adminTokens ? (
                adminNav()
            ) : IDTokens ? (
                loggedInNav()
            ) : (
                guestNav()
            )}
        </Navbar>
    )
}

export default Navigation;