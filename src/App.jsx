import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoute from "./AppRoute";
import Loader from "./components/Loader";
import ToastMessage from "./components/ToastMessage";
import { SHOW_TOAST } from "./constants/toastConstant";
import { USER_DETAILS_SUCCESS } from "./constants/userConstants";
import httpReq from "./utils/httpReq";

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.userDetails);
  const setAuthStatus = async () => {
    try {
      let response = await httpReq.get("/user/getuserdetail", true);
      dispatch({ type: USER_DETAILS_SUCCESS, payload: response.data.user });
    } catch (err) {
      dispatch({ type: SHOW_TOAST, payload: "Error loading user data. Try again." });
    }
  };
  React.useEffect(() => {
    setAuthStatus();
  }, []);
  return (
    <>
      {loading ? (
        <div className="loader">
          <Loader />
          <span>Loading . . .</span>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastMessage />
      <AppRoute />
    </AuthProvider>
  );
}
