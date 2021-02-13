import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useForm } from "react-hook-form";

const errorLabelStyle = {
  fontSize: "13px",
  color: "red",
};
const LoginScreen = () => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    e.preventDefault();
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {/* {error && <Message variant="danger">{error}</Message>} */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="email">
          <Form.Label>Email Address or Username</Form.Label>
          <Form.Control
            name="username"
            placeholder="email, username"
            ref={register({ required: true })}
            isInvalid={errors.username}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
            * required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="password"
            isInvalid={errors.password}
            ref={register({ required: true })}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
            * required
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary" style={{ fontSize: "13px" }}>
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
