import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem.jsx";
import "./RestMenu.css";
import { Navbar_RestoFood } from "../Navbar/Navbar.jsx";

const RestMenu = ({ user, setUser }) => {
  
  const { rest_id } = useParams();
  const [menuData, setMenuData] = useState([]);
  const [restName, setRestName] = useState('');
  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch menu data when the component mounts
    fetch(`http://localhost:8081/menu/${rest_id}`)
      .then((response) => response.json())
      .then((data) => {
        setMenuData(data);
        // Set the restaurant name from the first menu item (assuming all menu items belong to the same restaurant)
        if (data.length > 0) {
          setRestName(data[0].rest_name);
          console.log(restName);
        }
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [rest_id]);

  // const handleLogout = () => {
  //   setUser(null);
  // };

  useEffect(() => {
    if (!user) {
      // If the user is not logged in, redirect them to the login page
      navigate('/login');
    }
  }, [user, navigate]);
  
  return (
    <>
      <Navbar_RestoFood user={user} setUser={setUser} cartQuantity={cartQuantity}/>
      
      <h1 style={{color:"rgb(253, 97, 0)", textAlign:"center", paddingBlock:"1.5rem"}}>Menu for {restName} :</h1>
      <div className="menu-items-container">
        {/* Conditionally render menu items only when menuData is not empty */}
        {menuData.length > 0 && menuData.map((menuItem) => (
          <MenuItem key={menuItem.Food_ID} menuItem={menuItem} restID={rest_id} cartQuantity={cartQuantity} setCartQuantity={setCartQuantity}/>
        ))}
      </div>
    </>
  );
};

export default RestMenu;
