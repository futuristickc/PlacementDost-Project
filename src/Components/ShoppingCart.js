import React, { useContext } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";


function ShoppingCart() {
    const { cart, removeFromCart } = useContext(CartContext);

    return (
        <div>
            <h1>Shopping Cart</h1>
            <Row>
                {cart.map((product) => (
                    <Col key={product.id} sm={4}>
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>{product.price}</Card.Text>
                                <Button variant="danger" onClick={() => removeFromCart(product.id)}>
                                    Remove
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Button as={Link} to="checkout" variant="success">
                Proceed to Checkout
            </Button>
        </div>
    );
};

export default ShoppingCart;