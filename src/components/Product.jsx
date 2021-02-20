import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { LinkContainer } from "react-router-bootstrap";

const Product = ({ product }) => {
  return (
    <LinkContainer to={`/product/${product._id}`}>
      <Card className="my-3 p-2 rounded">
        <Card.Img src={product.image.url} variant="top" height={"200px"} />

        <Card.Body>
          <Card.Title style={{ textTransform: "capitalize" }}>{product.name}</Card.Title>

          <Card.Text as="div">
            <Rating value={product.rating} text={`${product.reviews} reviews`} />
          </Card.Text>

          <Card.Text as="h2">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
};

export default Product;
