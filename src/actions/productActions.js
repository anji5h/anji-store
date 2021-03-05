import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
} from "../constants/productConstants";
import httpReq from "../utils/httpReq";

export const listProducts = (keyword = "", pageNumber = 1) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await httpReq.get(`/product?keyword=${keyword}&pageNumber=${pageNumber}`);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await httpReq.get(`/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const listProductReview = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_REVIEW_REQUEST,
    });
    let { data } = await httpReq.get(`/product/reviews/${productId}`);
    dispatch({
      type: PRODUCT_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await httpReq.get(`/product/top`, false);

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
