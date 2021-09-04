import React from "react";
import { ListGroup, InputGroup, Button, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { logout } from "../actions/userActions";
import { SHOW_TOAST } from "../constants/toastConstant";
import httpReq from "../utils/httpReq";

export default function CartQuantity({ stock }) {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [qty, setQty] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    return () => setLoading(false);
  });
  const addToCartHandler = async () => {
    try {
      setLoading(true);
      await httpReq.post(`/product/cart/${params.id}`, { quantity: qty }, true);
      dispatch({ type: SHOW_TOAST, payload: "product added to cart" });
      history.push("/cart");
    } catch (err) {
      if (err.response?.status === 401) {
        return dispatch(logout());
      }
      dispatch({ type: SHOW_TOAST, payload: err.response?.data?.message || err.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ListGroup.Item>Quantity:</ListGroup.Item>
      <ListGroup.Item>
        <InputGroup>
          <InputGroup.Prepend>
            <Button
              variant="outline-secondary"
              onClick={() => setQty((Prev) => Prev + 1)}
              disabled={qty >= stock}
            >
              <i className="fas fa-plus"></i>
            </Button>
          </InputGroup.Prepend>
          <FormControl
            aria-describedby="basic-addon1"
            value={qty}
            readOnly
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
      <ListGroup.Item>
        <Button
          onClick={addToCartHandler}
          className="btn-block"
          type="button"
          disabled={stock === 0 || loading}
        >
          Add To Cart
        </Button>
      </ListGroup.Item>
    </>
  );
}
