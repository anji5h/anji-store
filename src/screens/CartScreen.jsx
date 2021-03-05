import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Button, Card, Table, Image } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getCart } from "../actions/cartActions";
import { formatPrice } from "../utils/formatNumber";
import { CART_DELETE_SUCCESS } from "../constants/cartConstants";
import { SHOW_TOAST } from "../constants/toastConstant";
import { USER_LOGOUT } from "../constants/userConstants";
import httpReq from "../utils/httpReq";

const CartScreen = () => {
  const dispatch = useDispatch();
  const [deleteLoading, setLoading] = React.useState(false);
  const { loading, cart, error } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getCart());
  }, []);

  const removeFromCartHandler = async (id, index) => {
    if (window.confirm("Are you sure want to delete it.")) {
      try {
        setLoading(true);
        await httpReq.remove(`/product/cart/${id}`, true);
        dispatch({ type: SHOW_TOAST, payload: "cart item deleted" });
        dispatch({ type: CART_DELETE_SUCCESS, payload: index });
      } catch (err) {
        if (err.response?.status === 401) {
          return dispatch({ type: USER_LOGOUT });
        }
        dispatch({ type: SHOW_TOAST, payload: err.response?.data?.message || err.message });
      } finally {
        setLoading(false);
      }
    }
  };

  const checkoutHandler = () => {};

  return (
    <>
      <h1>Shopping Cart</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col md={9}>
            <>
              {cart.length === 0 ? (
                <Message>
                  Your cart is empty <Link to="/">Go Back</Link>
                </Message>
              ) : (
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>S.N.</th>
                      <th>IMAGE</th>
                      <th>NAME</th>
                      <th>PRICE</th>
                      <th>QTY</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td style={{textAlign:'center'}}>
                          <Image
                            src={item.product?.image?.url}
                            alt={item.product?.name}
                            height="150px"
                            width='150px'
                          />
                        </td>
                        <td>{item.product?.name}</td>
                        <td>Rs. {formatPrice(item.product?.price)}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <Button
                            variant="danger"
                            className="btn-sm"
                            disabled={deleteLoading}
                            onClick={() => removeFromCartHandler(item._id, index)}
                            style={{ margin: " 0 5px" }}
                          >
                            <i class="far fa-trash-alt"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>Subtotal {cart.length} items</h3> Rs. 
                   {formatPrice(
                    cart.reduce((acc, item) => acc + item.quantity * item.product?.price, 0)
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CartScreen;
