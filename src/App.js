// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import ProductList from './Components/ProductList';
import StripeWrapper from './Components/PaymentComponent';

function App() {
  return (
    <div className="App">
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>E-Commerce</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='#home'>Home</Nav.Link>
          <Nav.Link href='#features'>Products</Nav.Link>
          <Nav.Link href='#pricing'>Cart</Nav.Link>
        </Nav>
        
        <Form inline="true">
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          <Button variant='outline-info'>Search</Button>
        </Form>
      </Navbar>

      <Container>
        <Row>
          <Col>
            <h1>Welcome to the E-Commerce Website</h1>
            <p>Browse and shop your favorite products</p>
          </Col>
        </Row>
        <ProductList />
        <StripeWrapper />
      </Container>
    </div>
  );
}

export default App;
