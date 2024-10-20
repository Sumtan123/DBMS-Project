import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuEdit from './MenuEdit'; // Assuming MenuEdit is used for displaying food items
import AddFoodItem from './AddFoodItem.jsx';
import { Navbar_RestoFood } from '../Navbar/Navbar.jsx';
import './RestaurantDashboard.css';

const RestaurantDashboard = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [menuData, setMenuData] = useState([]);
    const [restName, setRestName] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        fetch(`http://localhost:8081/menu/${user.Rest_ID}`) // Fetch menu items for the logged-in restaurant
            .then((response) => response.json())
            .then((data) => {
                setMenuData(data);
                if (data.length > 0) {
                    setRestName(data[0].rest_name); // Assuming all menu items belong to the same restaurant
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
        console.log(menuData);
    }, [user, navigate]);

    const handleRemoveItem = (foodId) => {
        fetch(`http://localhost:8081/menu/${foodId}/${user.Rest_ID}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    setMenuData(menuData.filter(item => item.Food_ID !== foodId)); // Update local state
                }
            })
            .catch((error) => console.error("Error removing item:", error));
    };
    return (
        <div>
            <Navbar_RestoFood user={user} setUser={setUser} />
            <h1 style={{padding:"20px 20px 0px 20px"}}>Menu for {restName}</h1>
            <div className="menu-items-container-dash">
                {menuData.map((menuItem) => (
                    <MenuEdit 
                        key={menuItem.Food_ID} 
                        menuItem={menuItem} 
                        restID={user.Rest_ID} 
                        onRemove={() => handleRemoveItem(menuItem.Food_ID)} // Pass remove function to MenuItem
                    />
                ))}
            </div>
            <AddFoodItem restID={user.Rest_ID} setMenuData={setMenuData} /> {/* Component to add new food items */}
        </div>
    );
};

export default RestaurantDashboard;
