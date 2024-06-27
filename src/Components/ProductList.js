import React, { useState } from "react";
import { Button, Card, Col, Row } from 'react-bootstrap'
const products = [
    {id: 1, name: 'Product 1', price: '$10', description: 'Description 1'},
    {id: 2, name: 'Product 2', price: '$20', description: 'Description 2'},
    {id: 3, name: 'Product 3', price: '$30', description: 'Description 3'},
];

function ProductList() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <Row>
            {products.map((product) => (
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text>{product.price}</Card.Text>
                            <Button onClick={() => addToCart(product)}>
                                Add to Cart
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))};
        </Row>
    );
};

export default ProductList;