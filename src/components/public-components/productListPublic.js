import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { CardColumns, Card, Row, Col, ListGroup, Form } from "react-bootstrap";
import axios from "axios";

function ProductListPublic(props) {
    const [isError, setIsError] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activePage, setActivePage] = useState(1);
    const productsPerPage = 9;
    const indexOfLastProduct = activePage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const Product = props => (
        <Card>
            <Row>
                <Col md={{ span: 4 }}>
                    <Card.Title className="mt-4 text-center">
                        <Link to={`/products/list/${props.product._id}/`}>{props.product.name}</Link>
                    </Card.Title>
                </Col>
                <Col md={{ span: 8 }}>
                <ListGroup>
                    <ListGroup.Item className="text-truncate">{props.product.description}</ListGroup.Item>
                    {props.product.stock > 0 ? (
                        <ListGroup.Item>{props.product.stock} in stock</ListGroup.Item>
                    ) : (
                        <ListGroup.Item>Currently out of stock</ListGroup.Item>
                    )}
                </ListGroup>
                </Col>
            </Row>
        </Card>
    )

    useEffect(() => {
        axios.get("http://localhost:4000/products/")
        .then(res => {
            setProducts(res.data);
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
            <CardColumns>
                <div>
                    { productList() }
                </div>
            </CardColumns>
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

export default ProductListPublic;