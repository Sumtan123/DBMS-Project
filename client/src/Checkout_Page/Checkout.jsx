import './Checkout.css';
import deliveryData from '../DeliveryBoy_Page/DeliveryBoy.json';
import { useEffect, useState } from "react";
import { Navbar_RestoFood } from '../Navbar/Navbar';
function Checkout({ user, setUser }) {
    const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(null);
    const [ratings, setRatings] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [timeLeft, setTimeLeft] = useState(5 * 60);


    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * deliveryData.length);
        setSelectedDeliveryBoy(deliveryData[randomIndex]);

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    return 'Delivered!';
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        try {
            const Cust_ID = user.Cust_ID;
            const Cust_Name = user.Cust_Name;
            await fetch('http://localhost:8081/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Cust_ID,
                    Cust_Name,
                    ratings,
                    feedback,
                }),
            });
            setRatings(0);
            setFeedback('');
        } catch (error) {
            console.error('Error submitting feedback:', error.message);
        }
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <>
            <Navbar_RestoFood user={user} setUser={setUser} onLogout={handleLogout} />
            <div className="Checkout-bg"><h1>{typeof timeLeft === 'number' ? `Delivering in ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')} mins` : timeLeft}</h1></div>
            <div className="delivery-info">
                {selectedDeliveryBoy && (
                    <div>
                        <h3>{selectedDeliveryBoy.DeliveryBoy_Name}</h3>
                        <p>{selectedDeliveryBoy.DeliveryBoy_Ph}</p>
                        <p>{selectedDeliveryBoy.DeliveryBoy_Ratings}⭐</p>
                    </div>
                )}
            </div>
            <div className="feedback-form">
                <h2>Platform Feedback</h2>
                <form onSubmit={handleSubmitFeedback}>
                    <label htmlFor="ratings">Ratings:</label>
                    <input
                        type="number"
                        id="ratings"
                        min="0"
                        max="5"
                        value={ratings}
                        onChange={(e) => setRatings(e.target.value)}
                    />

                    <label htmlFor="feedback">Feedback:</label>
                    <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />

                    <button type="submit">Submit Feedback</button>
                </form>
            </div>
        </>
    )
}

export default Checkout