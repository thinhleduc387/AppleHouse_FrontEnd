import { memo } from "react";
//import "./style.scss";
import { Button, Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <>
      <Navbar bg="white" variant="light">
        <Container>
          <Navbar.Brand href="#home">My Website</Navbar.Brand>
          <Nav className="me-auto">
          {/* Thêm form tìm kiếm vào đây */}
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default memo(Header);
