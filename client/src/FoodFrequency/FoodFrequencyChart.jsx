import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FoodFrequencyChart = () => {
    const [foodFrequencies, setFoodFrequencies] = useState([]);
    const [ordersPerRestaurant, setOrdersPerRestaurant] = useState([]);

    useEffect(() => {
        const fetchFoodFrequencies = async () => {
            try {
                const response = await fetch('http://localhost:8081/analytics/food-frequencies');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setFoodFrequencies(data);
            } catch (error) {
                console.error('Error fetching food frequencies:', error.message);
            }
        };

        const fetchOrdersPerRestaurant = async () => {
            try {
                const response = await fetch('http://localhost:8081/analytics/orders-per-restaurant');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setOrdersPerRestaurant(data);
            } catch (error) {
                console.error('Error fetching orders per restaurant:', error.message);
            }
        };

        fetchFoodFrequencies();
        fetchOrdersPerRestaurant();
    }, []);

    // Prepare chart data for food frequencies
    const foodChartData = {
        labels: foodFrequencies.map(item => item.Food_Name),
        datasets: [
            {
                label: 'Frequency of Food Items Ordered',
                data: foodFrequencies.map(item => item.OrderCount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    // Prepare chart data for orders per restaurant
    const restaurantChartData = {
        labels: ordersPerRestaurant.map(item => item.Rest_Name),
        datasets: [
            {
                label: 'Number of Orders Per Restaurant',
                data: ordersPerRestaurant.map(item => item.OrderCount),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                ticks: {
                    beginAtZero: true,
                    stepSize: 1, // This ensures the y-axis only shows whole numbers
                    callback: function (value) {
                        if (Number.isInteger(value)) {
                            return value;
                        }
                    }
                }
            }
        }
    };

    return (
        <div>
            <h2>Food Item Order Frequencies</h2>
            <Bar data={foodChartData} options={options}/>

            <h2>Orders Per Restaurant</h2>
            <Bar data={restaurantChartData} options={options}/>
        </div>
    );
};

export default FoodFrequencyChart;
