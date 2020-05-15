import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Form, Button, Accordion, Card, ListGroup } from "react-bootstrap";
import axios from "axios";

function ProductDelete(props) {
    const [ productIsDeleted, setProductIsDeleted ] = useState(false);
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
        }).catch(function (err) {
            console.log(err);
        })
    }, [props]);

    function postProduct() {
        const productToDelete = {
            name: name,
            description: description,
            price: price,
            stock: stock
        };

        axios.delete(`http://localhost:4000/products/${props.match.params.id}`,
        productToDelete
        ).then(res => {
            if (res.status === 200) {
                console.log(res.data);
                setProductIsDeleted(true);
            } else {
                setIsError(true);
            }
        }).catch(err => {
            setIsError(true);
        });
    }

    if(productIsDeleted) {
        return <Redirect to={"/products"} />;
    }

    return (
        <div className="text-center">
            <h2>Delete Product: {name}</h2>
            <Form style={{ marginTop: 20 }}>
                <p>Are you sure? Deleted products cannot be recovered.</p>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Product Info
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item>Name: {name}</ListGroup.Item>
                                    <ListGroup.Item>Description: {description}</ListGroup.Item>
                                    <ListGroup.Item>Price: ${price.toFixed(2)}</ListGroup.Item>
                                    <ListGroup.Item>Stock: {stock}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Button onClick={postProduct} variant="danger">Delete Product</Button>
            </Form>
            { isError &&<p>Something went wrong with deleting the product!</p> }
        </div>
    )
}

export default ProductDelete;