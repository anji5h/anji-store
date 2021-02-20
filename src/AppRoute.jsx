import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
// import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
// import ShippingScreen from "./screens/ShippingScreen";
// import PaymentScreen from "./screens/PaymentScreen";
// import PlaceOrderScreen from "./screens/PlaceOrderScreen";
// import OrderScreen from "./screens/OrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import CreateProductScreen from "./screens/ProductCreateScreen";
// import OrderListScreen from "./screens/OrderListScreen";

const PublicRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={(props) => (user ? <Redirect to="/" /> : <Component {...props} />)} />
);

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (user ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);

const AdminRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      user && user.role === 0 ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default function AppRoute() {
  const { user } = useSelector((state) => state.userDetails);
  return (
    <Router>
      <Header />
      <main style={{ paddingTop: "100px" }}>
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
          <PublicRoute path="/login" component={LoginScreen} user={user} />
          <PublicRoute path="/register" component={RegisterScreen} user={user} />
          <PrivateRoute path="/profile" component={ProfileScreen} user={user} />
          <AdminRoute path="/admin/userlist" component={UserListScreen} user={user} />
          <AdminRoute path="/admin/productlist" component={ProductListScreen} exact user={user} />
          <AdminRoute
            path="/admin/createproduct"
            component={CreateProductScreen}
            exact
            user={user}
          />
          <AdminRoute
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
            user={user}
          />
          <AdminRoute path="/admin/product/:id/edit" component={ProductEditScreen} user={user} />
          <AdminRoute path="/product/:id" component={ProductScreen} />
          {/* <Route path="/order/:id" component={OrderScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} /> */}
        </Container>
      </main>
    </Router>
  );
}
