import { memo } from "react";
import { Container, Button } from "react-bootstrap"; // Import Button
import { MDBInput } from "mdb-react-ui-kit"; // Import MDBInput
import "./style.scss"; // Import style nếu có

const LoginPage = () => {
  return (
    <div className="main_container">
      <Container fluid>
        <h2>Đăng nhập để làm thành viên của AppleHouse</h2>
        <div className="login-form">
          <MDBInput
            label="Email address"
            type="email"
            required
            className="mb-3"
          />
          <MDBInput
            label="Password"
            type="password"
            required
            className="mb-3"
          />
          <Button variant="primary" type="submit">
            Đăng Nhập
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default memo(LoginPage);
