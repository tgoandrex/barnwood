import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import axios from "axios";

function ProductListAdmin(props) {
    const [isError, setIsError] = useState(false);
    const [products, setProducts] = useState([]);

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
        return products.map(function(currentProduct, i){
            return <Product product={currentProduct} key={i} />;
        })
    }

    return (
        <div className="text-center">
            <h2>Products List</h2>
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
            { isError &&<p>Something went wrong with getting the products!</p> }
            <Link to="/products/new">Create a New Product</Link>
        </div>
    )
}

export default ProductListAdmin;