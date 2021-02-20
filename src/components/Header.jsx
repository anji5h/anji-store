import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import httpReq from "../utils/httpReq";
import { SHOW_TOAST } from "../constants/toastConstant";
import { USER_LOGOUT } from "../constants/userConstants";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetails);
  const logoutHandler = async () => {
    try {
      await httpReq.get("/auth/logout", true);
      dispatch({ type: USER_LOGOUT });
    } catch (err) {
      dispatch({ type: SHOW_TOAST, payload: "Failed to logout. Try again." });
    }
  };

  return (
    <header>
      <Navbar fixed="top" bg="dark" variant="dark" collapseOnSelect style={{ height: "90px" }}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ANJISH-STORE</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">
              {user && (
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Nav.Link>
                </LinkContainer>
              )}
              {user ? (
                <NavDropdown title={user.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {user?.role === 0 && (
                <NavDropdown title="Admin Portal" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
