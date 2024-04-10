import React, { useState, useEffect } from "react";
import './ProfilePage.css';
import axios from "axios";

function ProfilePage({ user }) {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8081/orders/${user.Cust_ID}`)
            .then((response) => response.json())
            .then((data) => {
                const filteredOrders = filterDuplicateOrders(data);
                setOrders(filteredOrders);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [user.Cust_ID]);

    const filterDuplicateOrders = (data) => {
        const uniqueOrders = {};

        data.forEach((order) => {
            const key = `${order.Orders_ID}-${order.Orders_Amount}-${order.Orders_Date}`;
            if (!uniqueOrders[key]) {
                uniqueOrders[key] = {
                    ...order,
                    Food_Name: [order.Food_Name], 
                };
            } else {
                uniqueOrders[key].Food_Name.push(order.Food_Name);
            }
        });

        return Object.values(uniqueOrders);
    };

    return (
        <div className="profile">
            <h2>Welcome, {user ? user.Cust_Name : "User"}</h2>
            <h3>Order History:</h3>
            <ul className="order-list">
                {Array.isArray(orders) && orders.map(order => (
                    <li key={order.Orders_ID} className="order-item">
                        <div className="order-details">
                            <span className="order-info"><b>Order ID:</b> {order.Orders_ID}</span>
                            <span className="order-info"><b>Food Name:</b> {order.Food_Name.join(', ')}</span>
                            <span className="order-info"><b>Restaurant Name:</b> {order.Rest_Name}</span>
                            <span className="order-info"><b>Order Amount:</b> ₹{order.Orders_Amount}</span>
                            <span className="order-info"><b>Order Date:</b> {order.Orders_Date.substring(0, 10)}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProfilePage;
