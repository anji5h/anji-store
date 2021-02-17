import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "./actions/userActions";
import AppRoute from "./AppRoute";
import Loader from "./components/Loader";
import ToastMessage from "./components/ToastMessage";

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { loading} = useSelector((state) => state.userDetails);

  React.useEffect(() => {
    dispatch(userDetails());
  }, []);
  return (
    <>
      {loading ? (
        <div className="loader">
          <Loader />
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
