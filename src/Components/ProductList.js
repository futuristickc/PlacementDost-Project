import React, { useContext } from "react";
import { Button, Card, Col, Row } from 'react-bootstrap'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { CartContext } from "./CartContext";


const products = [
    {id: 1, name: 'Product 1', price: '$10', description: 'Description 1', image: '/images/car_pic.jpg'},
    {id: 2, name: 'Product 2', price: '$20', description: 'Description 2', image: '/images/rolex_pic.jpg'},
    {id: 3, name: 'Product 3', price: '$30', description: 'Description 3', image: '/images/shoe_pic.jpg'},
];

function ProductList() {
    const { addToCart } = useContext(CartContext);
    // const [cart, setCart] = useState([]);

    // const addToCart = (product) => {
    //     setCart([...cart, product]);
    // };

    return (
        <Row>
            {products.map((product) => (
                <Col key={product.id} sm={4}>
                    <Card>
                        <LazyLoadImage 
                            src={product.image}
                            alt={product.name}
                            effects='blur'
                            width="100%"
                            height="auto"
                        />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text>{product.price}</Card.Text>
                            <Button  variant="primary" onClick={() => addToCart(product)}>
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