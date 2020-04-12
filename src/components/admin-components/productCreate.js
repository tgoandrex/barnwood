import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Col, Form, Button } from "react-bootstrap";
import axios from "axios";

function ProductCreate(props) {
    const [productIsCreated, setProductIsCreated] = useState(false);
    const [isError, setIsError] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

    function postProduct() {
        const productToCreate = {
            name,
            description,
            price,
            stock
        };

        axios.post("http://localhost:4000/products/add",
            productToCreate
        ).then(res => {
            if(res.status === 200) {
                console.log(res.data);
                setProductIsCreated(true);
            } else {
                setIsError(true);
            }
        }).catch(err => {
            setIsError(true);
        });
    }

    if(productIsCreated) {
        return <Redirect to={"/products"} />;
    }

    return (
        <div className="text-center">
            <h2>Create Product</h2>
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
                                    placeholder="Enter name"
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
                                    placeholder="Enter description"
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
                                    placeholder="Enter price"
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
                                    placeholder="Enter stock"
                                    />
                    </Form.Group>
                </Form.Row>
                <Button onClick={postProduct} variant="success">Create Product</Button>
                { isError &&<p>Something went wrong with creating the product!</p> }
            </Form>
        </div>
    )
}

export default ProductCreate;