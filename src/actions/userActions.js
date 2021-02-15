import {
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
} from "../constants/userConstants";
import httpReq from "../utils/httpReq";

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });
    const { data } = await httpReq.put(`/api/users/profile`, user, true);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });
    const { data } = await httpReq.get(`/admin/getusers`, true);
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    const message = error.response?.data?.message;
    // if (message === "Not authorized, token failed") {
    //   dispatch(logout());
    // }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    await httpReq.remove(`/api/users/${id}`,true);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    const { data } = await httpReq.put(`/api/users/${user._id}`, user, true);

    dispatch({ type: USER_UPDATE_SUCCESS });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

    dispatch({ type: USER_DETAILS_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};
