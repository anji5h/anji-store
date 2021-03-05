import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers } from "../actions/userActions";
import httpReq from "../utils/httpReq";
import { USER_DISABLE } from "../constants/userConstants";
import { SHOW_TOAST } from "../constants/toastConstant";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const [disableLoading, setLoading] = React.useState(false);
  const { loading, error, users } = useSelector((state) => state.userList);
  useEffect(() => {
    dispatch(listUsers());
    return () => setLoading(false);
  }, []);

  const handleDisable = async (id, index) => {
    if (window.confirm("Do you want to perform this action ?"))
      try {
        setLoading(true);
        await httpReq.put(`/admin/users/${id}/disable`, {}, true);
        dispatch({ type: USER_DISABLE, payload: index });
      } catch (err) {
        dispatch({ type: SHOW_TOAST, payload: err.response?.data?.message || err.message });
      } finally {
        setLoading(false);
      }
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>USERNAME</th>
              <th>VERIFIED</th>
              <th>ADMIN</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}.</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  {user.verified ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {user.role === 0 ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Button
                    variant={user.disabled ? "success" : "danger"}
                    className="btn-sm"
                    disabled={user.role === 0 || disableLoading}
                    onClick={() => handleDisable(user._id, index)}
                  >
                    {user.disabled ? "Enable" : "Disable"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
