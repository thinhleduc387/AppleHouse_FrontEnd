  import { memo } from "react";
  import { Link } from "react-router-dom"; // Import Link
  import Container from "react-bootstrap/Container";
  import Form from "react-bootstrap/Form";
  import Nav from "react-bootstrap/Nav";
  import Navbar from "react-bootstrap/Navbar";
  import Offcanvas from "react-bootstrap/Offcanvas";
  import "bootstrap/dist/css/bootstrap.min.css";
  import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
  import "./style.scss";
  import { ROUTERS } from "../../../../utils/router"; // Import ROUTERS

  const Header = () => {
    const expand = "lg";

    return (
      <Navbar expand={expand} className="mb-3">
        <Container fluid>
          <Navbar.Brand as={Link} to={ROUTERS.GUEST.HOME}>AppleHouse</Navbar.Brand>
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
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
                <Nav.Link as={Link} to="/favorites">
                  <i className="bi bi-heart icon"></i>
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  <i className="bi bi-bag icon"></i>
                </Nav.Link>
                <Nav.Link as={Link} to={ROUTERS.GUEST.LOGIN}>
                  <i className="bi bi-person icon"></i>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  };

  export default memo(Header);
