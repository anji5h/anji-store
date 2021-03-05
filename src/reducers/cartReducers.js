import {
  CART_DELETE_SUCCESS,
  CART_ITEM_FAIL,
  CART_ITEM_REQUEST,
  CART_ITEM_SUCCESS,
} from "../constants/cartConstants";

export const cartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case CART_ITEM_REQUEST: {
      return { loading: true, error: false, cart: [] };
    }
    case CART_ITEM_SUCCESS: {
      return { loading: false, error: false, cart: action.payload };
    }
    case CART_ITEM_FAIL: {
      return { loading: false, error: action.payload, cart: [] };
    }
    case CART_DELETE_SUCCESS: {
      state.cart.splice(action.payload, 1);
      return { loading: false, error: false, cart: [...state.cart] };
    }
    default:
      return state;
  }
};
