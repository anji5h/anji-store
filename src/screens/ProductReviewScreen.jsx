import React from "react";
import { Col, Form, ListGroup, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProductReview } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { SHOW_TOAST } from "../constants/toastConstant";
import { USER_LOGOUT } from "../constants/userConstants";
import { formatDate } from "../utils/formatNumber";
import httpReq from "../utils/httpReq";
import Rating from "./../components/Rating";

export default function ProductReviewScreen() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting,},
    reset,
  } = useForm();
  const params = useParams();
  const { user } = useSelector((state) => state.userDetails);
  const { loading, reviews, error } = useSelector((state) => state.productReviewList);

  React.useEffect(() => {
    dispatch(listProductReview(params.id));
  }, []);

  const submitHandler = async (data) => {
    try {
      await httpReq.post(`/product/reviews/${params.id}`, data, true);
      dispatch({ type: SHOW_TOAST, payload: "review added" });
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        return dispatch({ type: USER_LOGOUT });
      }
      dispatch({ type: SHOW_TOAST, payload: err.response?.data?.message || err.message });
    } finally {
      reset();
    }
  };
  return (
    <Col md={7}>
      <h2>Reviews</h2>
      <ListGroup variant="flush">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {reviews.length === 0 ? (
              <Message>No Reviews</Message>
            ) : (
              <>
                {reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.user?.username}</strong>
                    <Rating value={review.rating} />
                    <p className="review-date">reviewed on {formatDate(review.createdAt)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </>
            )}
          </>
        )}
        <ListGroup.Item>
          <h2>Write a Customer Review</h2>
          {user ? (
            user.role === 0 ? (
              <Alert variant="success">Hello admin</Alert>
            ) : (
              <Form onSubmit={handleSubmit(submitHandler)}>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    ref={register({ required: "* required" })}
                    name="rating"
                    isInvalid={errors.rating}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.rating?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    row="3"
                    name="comment"
                    isInvalid={errors.comment}
                    ref={register({ required: "* required" })}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.comment?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )
          ) : (
            <Message>
              Please <Link to="/login">sign in</Link> to write a review.
            </Message>
          )}
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}
