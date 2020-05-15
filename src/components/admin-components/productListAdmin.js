import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Col, Form, Table } from "react-bootstrap";
import axios from "axios";

function ProductListAdmin(props) {
    const [isError, setIsError] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activePage, setActivePage] = useState(1);
    const productsPerPage = 10;
    const indexOfLastProduct = activePage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const Product = props => (
        <tr>
            <td>
                <Link to={`/products/list/${props.product._id}/`}>{props.product.name}</Link>
            </td>
            <td>{props.product.description}</td>
            <td>${props.product.price.toFixed(2)}</td>
            <td>{props.product.stock}</td>
            <td>
                <Link to={`/products/${props.product._id}/edit/`}>Edit</Link>
            </td>
            <td>
                <Link to={`/products/${props.product._id}/delete/`}>Delete</Link>
            </td>
        </tr>
    )

    useEffect(() => {
        axios.get("http://localhost:4000/products/")
        .then(res => {
            setProducts(res.data)
        }).catch(function(err) {
            setIsError(true);
        })
    }, []);

    function productList() {
        if(searchTerm) {
            return products.filter(product => product.name.includes(searchTerm)).map((currentProduct, i) => {
                return <Product product={currentProduct} key={i} />;
            });
        } else {
            return currentProducts.map(function(product, i) {
                return <Product product={product} key={i} />;
            })
        }
    }

    function handlePageChange(pageNumber) {
        setActivePage(pageNumber);
    }

    return (
        <div className="text-center">
            <h2>Products List</h2>
            <Link to="/products/new">Create a New Product</Link>
            <Form>
                <Form.Row className="justify-content-sm-center">
                    <Form.Group as={Col} sm={{ span: 6 }}>
                        <Form.Label htmlFor="formSearch">Search Products</Form.Label>
                        <Form.Control
                                    controlid="formSearch"
                                    type="text"
                                    value={searchTerm}
                                    onChange={e => {
                                        setSearchTerm(e.target.value);
                                    }}
                                    placeholder="Product Name (case sensitive)"
                                    />
                    </Form.Group>
                </Form.Row>
            </Form>
            <Table striped bordered style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    { productList() }
                </tbody>
            </Table>
            {!searchTerm && products.length > productsPerPage ? (
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={productsPerPage}
                    totalItemsCount={products.length}
                    pageRangeDisplayed={3}
                    onChange={handlePageChange.bind(this)}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            ) : (
                <span></span>
            )}
            { isError &&<p>Something went wrong with getting the products!</p> }
        </div>
    )
}

export default ProductListAdmin;