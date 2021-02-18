import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { errorLabelStyle } from "./LoginScreen";

export default function CreateProductScreen() {
  const {
    register,
    errors,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm();
  const imageRef = React.useRef(null);
  const image = watch("image", "");

  const previewImage = (e) => {
    if (e.target.files?.length) {
      imageRef.current.src = URL.createObjectURL(e.target.files[0]);
    }
    return;
  };
  const { error, success } = useSelector((state) => state.productCreate);
  const submitHandler = (data) => {};

  return (
    <FormContainer>
      <h1>Create Product</h1>
      {error && <Message variant="danger"></Message>}

      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            placeholder="Enter product name"
            ref={register({ required: "* required" })}
            isInvalid={errors.name}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              placeholder="Enter product price"
              ref={register({
                required: "* required",
                pattern: { value: /^[0-9]+$/, message: "price must be number" },
              })}
              isInvalid={errors.price}
            ></Form.Control>
            <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
              {errors.price?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              name="brand"
              placeholder="Enter product brand"
              ref={register({ required: "* required" })}
              isInvalid={errors.brand}
            ></Form.Control>
            <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
              {errors.brand?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            defaultValue=""
            name="category"
            placeholder="Select product category"
            ref={register({ required: "* required" })}
            isInvalid={errors.category}
          >
            <option value="" disabled>
              Select product category
            </option>
            <option value="ED">Electronic devices</option>
            <option value="HB">Health &amp; Beauty</option>
            <option value="SC">Smartphones &amp; Computers</option>
            <option value="BT">Babies and Toys</option>
            <option value="GP">Groceries &amp; Pets</option>
            <option value="FL">Fashion &amp; Lifestyle</option>
            <option value="SO">Sports &amp; Outdoor</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
            {errors.category?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="description"
            ref={register({ required: "* required" })}
            isInvalid={errors.description}
            placeholder="Enter product description"
          ></Form.Control>
          <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          {!!image && (<img ref={imageRef} className="product-image"></img>)}
          <Form.File id="formcheck-api-custom" custom>
            <Form.File.Input
              name="image"
              ref={register({ required: "* required" })}
              onChange={previewImage}
              isInvalid={errors.image}
              accept="image/*"
            />
            <Form.File.Label data-browse="Choose">Choose product image</Form.File.Label>
            <Form.Control.Feedback type="invalid" style={errorLabelStyle}>
              {errors.image?.message}
            </Form.Control.Feedback>
          </Form.File>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={isSubmitting}>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
}
