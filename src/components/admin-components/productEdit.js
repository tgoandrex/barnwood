import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Col, Form, Button } from "react-bootstrap";
import axios from "axios";

function ProductEdit(props) {
    const [productIsEdited, setProductIsEdited] = useState(false);
    const [isError, setIsError] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:4000/products/${props.match.params.id}`)
        .then(res => {
            setName(res.data.product.name);
            setDescription(res.data.product.description);
            setPrice(res.data.product.price);
            setStock(res.data.product.stock);
        }).catch(function(err) {
            setIsError(true);
        })
    }, [props]);

    function postProduct() {
        const updatedProduct = {
            name,
            description,
            price,
            stock
        };

        axios.put(`http://localhost:4000/products/${props.match.params.id}`,
            updatedProduct
        ).then(res => {
            if(res.status === 200) {
                console.log(res.data);
                setProductIsEdited(true);
            } else {
                setIsError(true);
            }
        }).catch(err => {
            setIsError(true);
        });
    }

    if(productIsEdited) {
        return <Redirect to={"/products"} />;
    }

    return (
        <div className="text-center">
            <h2>Edit Product</h2>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} sm={{ span: 6 }}>
                        <Form.Label htmlFor="formName">Name</Form.Label>
                        <Form.Control
                                    controlid="formName"
                                    type="text" 
                                    value={name}
                                    onChange={e => {
                                        setName(e.target.value);
                                    }}
                                    autoFocus
                                    />
                    </Form.Group>
                    <Form.Group as={Col} sm={{ span: 6 }}>
                        <Form.Label htmlFor="formDescription">Description</Form.Label>
                        <Form.Control
                                    controlid="formDescription"
                                    type="text" 
                                    value={description}
                                    onChange={e => {
                                        setDescription(e.target.value);
                                    }}
                                    />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} sm={{ span: 4 }}>
                        <Form.Label htmlFor="formPrice">Price</Form.Label>
                        <Form.Control
                                    controlid="formPrice"
                                    type="number"
                                    min="0"
                                    max="9999"
                                    step=".01"
                                    value={price}
                                    onChange={e => {
                                        setPrice(e.target.value);
                                    }}
                                    />
                    </Form.Group>
                    <Form.Group as={Col} sm={{ span: 4, offset: 4 }}>
                        <Form.Label htmlFor="formStock">Stock</Form.Label>
                        <Form.Control
                                    controlid="formStock"
                                    type="number"
                                    min="0"
                                    max="9999"
                                    step="1"
                                    value={stock}
                                    onChange={e => {
                                        setStock(e.target.value);
                                    }}
                                    />
                    </Form.Group>
                </Form.Row>
                <Button onClick={postProduct} variant="warning">Edit Product</Button>
                { isError &&<p>Something went wrong with editing the product!</p> }
            </Form>
        </div>
    )
}

export default ProductEdit;