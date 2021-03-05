import {
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
  USER_DISABLE,
} from "../constants/userConstants";

export const userDetailsReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case USER_DETAILS_SUCCESS:
      return { user: action.payload };
    case USER_DETAILS_RESET:
      return { user: null };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_DISABLE: {
      let user = state.users[action.payload];
      user.disabled = !user.disabled;
      return { loading: false, users: [...state.users] };
    }
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};
