import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import Cart from "./Cart";
import Contact from "./Contact";
import Home from "./Home";
import PurchaseHistory from "./PurchaseHistory";
import Veg from "./Veg";
import NonVeg from "./Nonveg";
import './App.css'; 
import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import GoogleLoginComponent from "./GoogleLoginComponent";

function App() {
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <h1>Do Modification</h1>
    <GoogleOAuthProvider clientId="62137407638-pcm9moq2bvhg67jj8rdol9ldfaa12lvm.apps.googleusercontent.com"> 
    <GoogleLoginComponent />
    </GoogleOAuthProvider>
      <BrowserRouter>
        <nav>
          <Link to="/home"> Home</Link>
          <Link to="/about"> About</Link>
          <Link to="/veg"> Veg Item</Link>
          <Link to="/nonveg"> Non-Veg Item</Link>
          <Link to="/cart">Cart {totalItems}</Link>
          <Link to="/purchase-history"> Purchase History</Link>
          <Link to="/contact"> Contact</Link>
        </nav>
        
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/veg" element={<Veg />} />
        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
