
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
// import Home from "./Home_Page/HomePage";
// import Login from "./Login_Page/LoginPage.jsx";
import Login from './Login_Page/LoginPage2.jsx';
// import {Navbar_Home} from "./Navbar/Navbar.jsx";
import { Navbar_Home, Navbar_RestoFood } from './Navbar/Navbar.jsx';
import Restaurants from './Restaurants_Page/Restaurants.jsx';
import Homepage from "./Home_Page/Homepage_new.jsx";
import RestMenu from "./RestMenu_Page/RestMenu.jsx";
import OrderPage from './Orders_Page/OrderPage.jsx';
import Checkout from "./Checkout_Page/Checkout.jsx";
import ContactPage from './Contact_Page/ContactPage.jsx';
import RestaurantLogin from './Restaurant_login/RestaurantLogin.jsx';
import AdminLogin from './Admin_Login/AdminLogin.jsx';
import ProfilePage from './Profile_Page/ProfilePage.jsx';
import { CartProvider } from './RestMenu_Page/cartContext.jsx';
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  }

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage user={user} setUser={setUser} />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
          {/* <Route path="/navbar" element={<Navbar_Home />}/> */}
          <Route path='/restaurants' element={<Restaurants user={user} setUser={setUser} />} />
          {/* <Route path='/restaurant/RestMenu' element={<RestMenu/>}/> */}
          <Route path="/menu/:rest_id" element={<RestMenu user={user} setUser={setUser}/>} />
          <Route path='/orders' element={<OrderPage user={user} setUser={setUser}/>} />
          <Route path='/checkoutPage' element={<Checkout user={user} setUser={setUser} />} />
          <Route path='/contact' element={<ContactPage user={user} setUser={setUser} />} />
          <Route path='/restaurant-dashboard' element={<RestaurantLogin />} />
          <Route path='/admin-dashboard' element={<AdminLogin />} />
          <Route path='/profile' element={<ProfilePage user={user} setUser={setUser}/>}/>
          {/* <Route
          path="/"
          element={<Navbar_Home user={user} />}
        /> */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
