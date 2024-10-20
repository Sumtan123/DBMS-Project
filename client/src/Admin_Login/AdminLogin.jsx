import { React, useState, useEffect } from 'react';
import './AdminLogin.css';
import axios from 'axios';
import '../FoodFrequency/FoodFrequencyChart';
import FoodFrequencyChart from '../FoodFrequency/FoodFrequencyChart';
const restaurantNames = [
  'Kakal Kai Ruchi',
  'Paradise Biryani',
  'Truffles',
  'Chai Point',
  'Polar Bear',
  'A2B (Adyar Anand Bhavan)',
  'Hotel Empire',
  'Easy Bites',
  'Dominos',
  'Nandhana Palace',
  'Hyderabadi Bawarchi',
  'Hari Super Sandwich',
  'McDonalds',
  'Biryani Zone',
  'Paakashala',
  'Maiyas',
  'Srinidhi Sagar',
];


const AdminLogin = () => {
  const [customerNames, setCustomerNames] = useState([]);
  const [recentFeedback, setRecentFeedback] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
      fetchCustomerNames();
      fetchRecentFeedback();
      fetchRecentOrders();
  }, []);

  const fetchCustomerNames = async () => {
      try {
          const response = await fetch('http://localhost:8081/customer');
          const data = await response.json();
          setCustomerNames(data);
      } catch (error) {
          console.error('Error fetching customer names:', error.message);
      }
  };

  const fetchRecentFeedback = async () => {
      try {
          const response = await fetch('http://localhost:8081/feedback');
          const data = await response.json();
          setRecentFeedback(data);
      } catch (error) {
          console.error('Error fetching recent feedback:', error.message);
      }
  };

  const fetchRecentOrders = async () => {
      try {
          const response = await axios.get('http://localhost:8081/orders/recent');
          setRecentOrders(response.data);
      } catch (error) {
          console.error('Error fetching recent orders:', error.message);
      }
  };

  return (
      <>
          <div className="admin-container">
              <h1>Admin Dashboard</h1>
              <div className="dashboard-grid">
                  <div className="dashboard-card">
                      <h3>Customers</h3>
                      <ul className="customer-list">
                          {customerNames.map((name, index) => (
                              <li key={index} className="customer-name">
                                  {name}
                              </li>
                          ))}
                      </ul>
                  </div>
                  <div className="dashboard-card">
                      <h3>Restaurants</h3>
                      <ul className="restaurant-list">
                          {restaurantNames.map((name) => (
                              <li key={name} className="restaurant-name">
                                  {name}
                              </li>
                          ))}
                      </ul>
                  </div>
                  <div className="dashboard-card feedback-card">
                      <h3>Recent Feedback</h3>
                      <ul className="feedback-list">
                          {recentFeedback.map((feedback, index) => (
                              <li key={index} className="feedback-item">
                                  <b>{feedback.name}:</b> {feedback.feedback} - {feedback.ratings}⭐
                              </li>
                          ))}
                      </ul>
                      <button className="view-all-btn">View All Feedback</button>
                  </div>
                  <div className="dashboard-card orders-card">
                      <h3>Recent Orders</h3>
                      <ul className="orders-list">
                          {recentOrders.map((order) => (
                              <li key={order.Orders_ID} className="order-item">
                                  <p>
                                      <b>Order ID:</b> {order.Orders_ID}
                                  </p>
                                  <p>
                                      <b>Customer:</b> {order.customerName}
                                  </p>
                                  <p>
                                      <b>Restaurant:</b> {order.restaurantName}
                                  </p>
                                  <p>
                                      <b>Total:</b> ₹{order.Orders_Amount}
                                  </p>
                              </li>
                          ))}
                      </ul>
                      <button className="view-all-btn">View All Orders</button>
                  </div>
              </div>
          </div>
          <FoodFrequencyChart />
      </>
  );
};

export default AdminLogin;

