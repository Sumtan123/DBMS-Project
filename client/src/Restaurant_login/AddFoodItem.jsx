import React, { useState } from 'react';

const AddFoodItem = ({ restID, setMenuData }) => {
    const [foodName, setFoodName] = useState('');
    const [price, setPrice] = useState('');
    const [calories, setCalories] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newFoodItem = {
            Food_Name: foodName,
            Price: parseFloat(price),
            Calories: parseInt(calories, 10),
            Food_Description: description,
            ImageURL: imageURL,
            Rest_ID: restID,
        };

        // Add the new food item to the database
        fetch(`http://localhost:8081/menu`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFoodItem),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to add food item'); // Handle errors
            }
            return response.json();
        })
        .then(() => {
            // Fetch the updated menu data from the database
            return fetch(`http://localhost:8081/menu/${restID}`); // Adjust endpoint if necessary
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch menu data'); // Handle errors
            }
            return response.json();
        })
        .then((data) => {
            setMenuData(data); // Update local state with the fresh menu data
            clearForm();
        })
        .catch((error) => console.error("Error adding item:", error));
        
        console.log(newFoodItem);
    };

    const clearForm = () => {
        setFoodName('');
        setPrice('');
        setCalories('');
        setDescription('');
        setImageURL('');
    };

    return (
        <div>
            <div className="add-food-cont-dash">
                <form onSubmit={handleSubmit} className="add-food-form-dash">
                    <input type="text" placeholder="Food Name" value={foodName} onChange={(e) => setFoodName(e.target.value)} required />
                    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    <input type="number" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} required />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <input type="text" placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />
                    <button type="submit">Add Food Item</button>
                </form>
            </div>
        </div>
    );
};

export default AddFoodItem;
