import { memo } from "react";
//import "./style.scss";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";

const Header = () => {
  const expand = "lg";

  return (
    <Navbar expand={expand} className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#">AppleHouse</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Offcanvas placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>AppleHouse</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form className="d-flex search-field">
              <Form.Control type="search" placeholder="Search" />
            </Form>
            <Nav className="justify-content-start flex-grow-1">
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default memo(Header);
