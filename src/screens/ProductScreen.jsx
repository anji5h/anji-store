import React, { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Card, Button, InputGroup, FormControl } from "react-bootstrap";
import Loader from "../components/Loader";
import { listProductDetails } from "../actions/productActions";
import ProductReviewScreen from "./ProductReviewScreen";

const ProductScreen = ({ history }) => {
  const [qty, setQty] = useState(1);
  const params = useParams();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, []);

  const addToCartHandler = () => {
    history.push(`/cart/${params.id}?qty=${qty}`);
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Redirect to="/"></Redirect>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product.image?.url} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item as="h3" style={{ textTransform: "capitalize" }}>
                  {product.name}
                </ListGroup.Item>
                <ListGroup.Item as="h4">
                  <span style={{ color: "orange", fontWeight: "bold" }}> Rs. {product.price}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description:{" "}
                  <span style={{ textTransform: "capitalize" }}>{product.description}</span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product.stock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                    </Row>
                  </ListGroup.Item>

                  {product.stock > 0 && (
                    <>
                      <ListGroup.Item style={{ textAlign: "center" }}>Quantity:</ListGroup.Item>
                      <ListGroup.Item>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <Button
                              variant="outline-secondary"
                              onClick={() => setQty((Prev) => Prev + 1)}
                              disabled={qty >= product.stock}
                            >
                              <i className="fas fa-plus"></i>
                            </Button>
                          </InputGroup.Prepend>
                          <FormControl
                            aria-describedby="basic-addon1"
                            value={qty}
                            style={{ textAlign: "center" }}
                          />
                          <InputGroup.Append>
                            <Button
                              variant="outline-secondary"
                              onClick={() => setQty((Prev) => Prev - 1)}
                              disabled={qty <= 1}
                            >
                              <i className="fas fa-minus"></i>
                            </Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </ListGroup.Item>
                    </>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      variant="secondary"
                      className="btn-block"
                      type="button"
                      disabled={product.stock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <ProductReviewScreen />
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
