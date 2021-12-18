import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from "./Screens/cartScreen"
import { useSelector,useDispatch } from 'react-redux';
import SigninScreen from './Screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import PlaceOrderScreen from './Screens/PlaceorderScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import OrderScreen from './Screens/orderScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import ProfileScreen from './Screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import ProductListScreen from './Screens/ProductListScreen';
import AdminRoute from './components/AdminRoute';
import ProductEditScreen from './Screens/ProductEditScreen';
import OrderListScreen from './Screens/OrderListScreen';




function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
        <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">
            amazona
          </Link>
        </div>
        <div>
        <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                {/* <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li> */}
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
                   {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  {/* <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li> */}
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  {/* <li>
                    <Link to="/userlist">Users</Link>
                  </li> */}
                </ul>
              </div>
            )}
        </div>
      </header>
      <main>
        <Routes>
        <Route path="/cart" element={<CartScreen/>}></Route>
        <Route path="/cart/:id" element={<CartScreen/>}></Route>
      <Route path="/product/:id" element={<ProductScreen/>}></Route>
      <Route
              path="/product/:id/edit"
              element={<ProductEditScreen/>}
              exact
            ></Route>
      <Route path="/signin" element={<SigninScreen/>}></Route>
      <Route path="/register" element={<RegisterScreen/>}></Route>
      <Route path="/shipping" element={<ShippingAddressScreen/>}></Route>
      <Route path="/placeorder" element={<PlaceOrderScreen/>}></Route>
      <Route path="/payment" element={<PaymentMethodScreen/>}></Route>
      <Route path="/order/:id" element={<OrderScreen/>}></Route>
      <Route path="/orderhistory" element={<OrderHistoryScreen/>}></Route>
      <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />

<Route
              path="/productlist"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />
             <Route
              path="/orderlist"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            />
      <Route path="/" element={<HomeScreen/>}exact></Route>



      </Routes>
        <div>
          {/* <div className="row center">
            {data.products.map((product) => (
           <Product key={product._id} product={product}></Product>
            ))}
          </div> */}
        </div>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>

  );
}

export default App;