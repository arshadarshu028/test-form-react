import React from "react";
import { Navbar, Container } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="info" variant="dark" className="shadow py-3">
      <Container>
        <Navbar.Brand href="#home">
          <h4 className="mb-0">React Form</h4>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
