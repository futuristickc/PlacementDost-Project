// import logo from './logo.svg';
import React, { Suspense, lazy, useContext } from 'react';
import './App.css';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

const ProductList = lazy(() => import('./Components/ProductList'));
const ShoppingCart = lazy(() => import('./Components/ShoppingCart'));
const Checkout = lazy(() => import('./Components/Checkout'));
const Register = lazy(() => import('./Components/Register'));
const Login = lazy(() => import('./Components/Login'));
// const StripeWrapper = lazy(() => import('./Components/PaymentComponent'));


function App() {
  const { user } = useContext(AuthContext);


  return (
    <Router>
      <div className="App">
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand as={Link} to='/'>E-Commerce</Navbar.Brand>
          <Nav className='mr-auto'>
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/products'>Products</Nav.Link>
            <Nav.Link as={Link} to='/cart'>Cart</Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>
                <Nav.Link as={Link} to='/logout'>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
              </>
            )}
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
            <Routes>
              <Route path="/" element={<ProductList />}/>
              <Route path="/products" element={<ProductList />}/>
              <Route path="/cart" element={<ProtectedRoute element={<ShoppingCart />} />}/>
              <Route path="/cart/checkout" element={<ProtectedRoute element={<Checkout />} />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="*" element={<Navigate to='/' />}/>
            </Routes>
          </Suspense>
        </Container>
      </div>
    </Router>
  );
}
          

          

export default App;
            
