import './OrderPage.css';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../RestMenu_Page/cartContext';
import { useState } from "react";
import axios from 'axios';

const OrderPage = ({ user, setUser }) => {
    const navigate = useNavigate();
    const { cart } = useCartContext();
    console.log('cart:', cart);
    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + (item.Food_Qty * item.Price), 0);
    };

    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const handleCheckout = async () => {
        try {
            setCheckoutLoading(true);
            const response = await axios.post("http://localhost:8081/checkout", {
                user_id: user.Cust_ID, // Assuming you have the user ID
                cart: cart, // Your cart JSON
            });
            console.log("Checkout response:", response.data);
            // Redirect to the next page after successful checkout
            navigate("/checkoutPage")
        } catch (error) {
            console.error("Error during checkout:", error);
            // Handle error (display error message, etc.)
        } finally {
            setCheckoutLoading(false);
        }
    };
    
    return (
        <div className="order-page-container">
            
            <h1>Your Orders</h1>
                 {cart.length > 0 ? (
                    <table className='OrderPageTable'>
                        <thead>
                            <tr>
                                <th>Sl No</th>
                                <th>Food Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.Food_Name}</td>
                                    <td>{item.Food_Qty}</td>
                                    <td>₹{item.Price}</td>
                                    <td>₹{item.Food_Qty * item.Price}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="4" className="total-label">Total Amount:</td>
                                <td className="total-amount">₹{calculateTotalAmount()}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>Your cart is empty</p>
                )}
                {cart.length > 0 && (
                    <button onClick={handleCheckout} disabled={checkoutLoading}>
                        {checkoutLoading ? "Processing..." : "Checkout"} </button>
                )}
        </div>
    )
}

export default OrderPage;
