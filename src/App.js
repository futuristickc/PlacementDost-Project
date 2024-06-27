// import logo from './logo.svg';
import './App.css';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar>
        <Navbar.Brand>E-Commerce</Navbar.Brand>
        <Nav>
          <Nav.Link>Home</Nav.Link>
          <Nav.Link>Products</Nav.Link>
          <Nav.Link>Cart</Nav.Link>
        </Nav>
        
        <Form>
          <FormControl />
          <Button>Search</Button>
        </Form>
      </Navbar>

      <Container>
        <Row>
          <Col>
            <h1>Welcome to the E-Commerce Website</h1>
            <p>Browse and shop your favorite products</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
