// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { Suspense, lazy } from 'react';

const ProductList = lazy(() => import('./Components/ProductList'));
const StripeWrapper = lazy(() => import('./Components/PaymentComponent'));

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

        <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <StripeWrapper />
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
