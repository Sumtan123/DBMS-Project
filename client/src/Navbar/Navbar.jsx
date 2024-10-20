import logo from "../assets/Images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import "../Navbar/Navbar.css";
import { useNavigate } from "react-router-dom";
import React from "react";
function Navbar_RestoFood({ user, setUser, cartQuantity }) {
    const navigate = useNavigate();
    const loginClick = () => navigate("/login");
    const navToMenu = () => navigate("/");
    const navToOrders = () => navigate("/orders");
    const contactClick = () => navigate("/contact");
    const profileClick = () => navigate("/profile");
    // const handleLogout = () => {
    //     setUser(null);
    // };
    const onLogout = () => {
        setUser(null);
        navigate("/");
    };
    return (
        <div className="navbar_Container">
            <img src={logo} alt="Logo" className="left nav_logo" onClick={navToMenu} />
            <ul className="Nav_list right">
                <li className="nav_items" onClick={contactClick}>Contact</li>
                {user ? (
                    <>
                        <li className="nav_items" onClick={profileClick}>
                            {user.Cust_Name} {/* Display the user's name */}
                        </li>
                        <li className="nav_items" onClick={onLogout}>
                            Sign Out
                        </li>
                    </>
                ) : (
                    <li className="nav_items" onClick={loginClick}>
                        Login
                    </li>
                )}
                <li className="nav_items cart">
                    <FontAwesomeIcon icon={faCartShopping} onClick={navToOrders} />
                    {cartQuantity > 0 && (
                        <span className="cart-count">{cartQuantity}</span>
                    )}
                </li>
            </ul>
        </div>
    )
}

function Navbar_Home({ user, setUser }) {
    const navigate = useNavigate();
    const navToMenu = () => navigate("/");
    const loginClick = () => navigate("/login");
    const contactClick = () => navigate("/contact");
    const profileClick = () => navigate("/profile");
    const onLogout = () => {
        setUser(null);
        navigate("/");
    };
    return (
        <div className="navbar_Container">
            <img src={logo} alt="Logo" className="left nav_logo" onClick={navToMenu} />
            <ul className="Nav_list right">
                <li className="nav_items" onClick={contactClick}>Contact</li>
                {user ? (
                    <>
                        <li className="nav_items" onClick={profileClick}>
                            {user.Cust_Name} {/* Display the user's name */}
                        </li>
                        <li className="nav_items" onClick={onLogout}>
                            Sign Out
                        </li>
                    </>
                ) : (
                    <li className="nav_items" onClick={loginClick}>
                        Login
                    </li>
                )}
            </ul>
        </div>
    )
}
export { Navbar_Home, Navbar_RestoFood };