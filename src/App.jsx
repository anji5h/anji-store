import React from "react";
import { useDispatch } from "react-redux";
import AppRoute from "./AppRoute";
import Loader from "./components/Loader";
import ToastMessage from "./components/ToastMessage";
import { SHOW_TOAST } from "./constants/toastConstant";
import { USER_DETAILS_SUCCESS } from "./constants/userConstants";
import httpReq from "./utils/httpReq";

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const getAuthStatus = async () => {
    try {
      const { data } = await httpReq.get(`/user/getuserdetail`, true);
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: SHOW_TOAST,
        payload: error.response?.data?.message || "failed to load user data. try again",
      });
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getAuthStatus();
    return () => setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        children
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
