import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useForm } from "react-hook-form";

const RegisterScreen = () => {
  const [error, setError] = React.useState(null);
  const {
    register,
    errors,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            name="name"
            placeholder="Enter name"
            ref={register({ required: true })}
          ></Form.Control>
          
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" placeholder="Enter username" ref={register}></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control name="email" placeholder="Enter email" ref={register}></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            ref={register}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="re-password"
            ref={register}
            placeholder="Confirm password"
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?
          <Link to="/login"> Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
