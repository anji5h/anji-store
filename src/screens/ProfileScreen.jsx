import React from "react";
import { Form, Button, ListGroup, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import httpReq from "../utils/httpReq";
import { SHOW_TOAST } from "../constants/toastConstant";
import { USER_LOGOUT } from "../constants/userConstants";
=======
import Message from "../components/Message";
import Loader from "../components/Loader";
import { updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
>>>>>>> parent of 59c2604 (added cart component)

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetails);
  const {
    register,
    errors,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm();

<<<<<<< HEAD
  const submitHandler = async (data) => {
    try {
      await httpReq.put("/user/update/password", data, true);
      dispatch({ type: SHOW_TOAST, payload: "password updated" });
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch({ type: USER_LOGOUT });
      }
      dispatch({ type: SHOW_TOAST, payload: err.response?.data?.message || err.message });
=======
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, password }));
>>>>>>> parent of 59c2604 (added cart component)
    }
  };

  return (
<<<<<<< HEAD
    <>
      <h2>User Details</h2>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col md={5}>Full Name : </Col>
            <Col>{user.name}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col md={5}>Username : </Col>
            <Col>{user.username}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col md={5}>Email Address : </Col>
            <Col>{user.email}</Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>

      <h2>Change Password</h2>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group controlId="oldPassword">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            name="old_password"
            placeholder="Old password"
            ref={register({
              required: "* required",
            })}
            isInvalid={errors.old_password}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.old_password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="new_password"
            placeholder="New password"
            ref={register({
              required: "* required",
              minLength: { value: 8, message: "password must have 8 characters or more." },
            })}
            isInvalid={errors.new_password}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.new_password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            name="confrim_password"
            placeholder="Confirm new password"
            ref={register({
              validate: (value) => watch("new_password") === value || "password don't match",
            })}
            isInvalid={errors.confrim_password}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.confrim_password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          Submit
        </Button>
        <LinkContainer to="/" style={{ marginLeft: "10px" }}>
          <Button type="button" variant="dark">
            Go Back
          </Button>
        </LinkContainer>
      </Form>
    </>
=======
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={user.name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control value={user.username} disabled readOnly></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" value={user.email} disabled readOnly></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
>>>>>>> parent of 59c2604 (added cart component)
  );
};

export default ProfileScreen;
