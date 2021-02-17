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
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
} from "../constants/userConstants";
import httpReq from "../utils/httpReq";

const logout = () => ({
  type: USER_LOGOUT,
});

export const userDetails = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    const { data } = await httpReq.get(`/user/getuserdetail`, true);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response?.data?.message,
    });
  }
};
export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });
    const { data } = await httpReq.put(`/api/users/profile`, user, true);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response?.data?.message,
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
    if (error.response?.status === 401) {
      dispatch(logout());
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    await httpReq.remove(`/api/users/${id}`, true);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(logout());
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    const { data } = await httpReq.put(`/api/users/${user._id}`, user, true);

    dispatch({ type: USER_UPDATE_SUCCESS });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

    dispatch({ type: USER_DETAILS_RESET });
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response?.data?.message,
    });
  }
};
