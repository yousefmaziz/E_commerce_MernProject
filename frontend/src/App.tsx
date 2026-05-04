import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import AuthProvider from "./context/Auth/Providor";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import CartProvider from "./context/cart/CartProvidor";
import CheckOut from "./pages/CheckOut";
import Order from "./pages/Order";
import MyOrder from "./pages/MyOrder";
function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckOut />} />
                <Route path="/order" element={<Order />} />
                <Route path="/myorder" element={<MyOrder />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
