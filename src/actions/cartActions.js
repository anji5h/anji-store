import { CART_ITEM_FAIL, CART_ITEM_REQUEST, CART_ITEM_SUCCESS } from "../constants/cartConstants";
import httpReq from "../utils/httpReq";
import { logout } from "./userActions";


export const getCart = () => async (dispatch) => {
  dispatch({ type: CART_ITEM_REQUEST });
  try {
    const { data } = await httpReq.get(`/product/cart`, true);
    dispatch({
      type: CART_ITEM_SUCCESS,
      payload: data.cart,
    });
  } catch (err) {
    if (err.response?.status === 401) {
      return dispatch(logout());
    }
    dispatch({ type: CART_ITEM_FAIL, payload: err.response?.data?.message || err.message });
  }
};
