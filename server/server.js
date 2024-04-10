const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
app.use(cors())
app.use(express.json());
const db = mysql2.createConnection({
    host: {host_name},
    user: {user_name},
    password: {sql_password},
    database: {database_name}
})
mongoose.connect({mongodb_url}, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error.message));
const Feedback = require('./Feedback');
app.get('/', (req, res) => {
    return res.json("From backend side");
})

app.get('/customer', (req, res) => {
    db.query('SELECT Cust_Name FROM Customer', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        const customerNames = data.map(customer => customer.Cust_Name);
        return res.json(customerNames);
    });
});

app.get('/restaurant', (req, res) => {
    const searchTerm = req.query.searchTerm; // Assuming the search term is passed as a query parameter

    // Constructing the SQL query with a WHERE clause to filter based on the search term
    let sql = "SELECT restaurant.*, GROUP_CONCAT(cuisine.CuisineType) AS CuisineTypes FROM restaurant JOIN cuisine ON restaurant.Rest_ID = cuisine.Rest_ID";

    // Checking if a search term is provided
    if (searchTerm) {
        // Using LIKE clause to perform a partial match search
        sql += ` WHERE restaurant.Rest_Name LIKE '%${searchTerm}%'`;
    }

    sql += " GROUP BY restaurant.Rest_ID";

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/menu/:rest_id', (req, res) => {
    const restId = req.params.rest_id;
    const sql = `
        SELECT 
            food.*, 
            restaurant.rest_name 
        FROM 
            food 
        JOIN 
            menu ON food.Food_ID = menu.food_id 
        JOIN 
            restaurant ON menu.rest_id = restaurant.Rest_ID 
        WHERE 
            menu.rest_id = ?`;
    db.query(sql, [restId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/signup', (req, res) => {
    const { name, username, email, password, phone, dob, address } = req.body;

    if (!name || !username || !email || !password || !phone || !dob || !address) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    let hashedPassword = password;
    let nextCustId = 1; // Default value if no records exist

    // Check if email is already registered
    db.query('SELECT * FROM Customer WHERE Cust_Email = ?', [email], (err, emailCheckResults) => {
        if (err) {
            console.error('Error checking email:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (emailCheckResults.length > 0) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Get the maximum customer ID
        db.query('SELECT MAX(Cust_ID) AS maxId FROM Customer', (err, maxIdResults) => {
            if (err) {
                console.error('Error getting max ID:', err.message);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (maxIdResults.length > 0 && maxIdResults[0].maxId) {
                nextCustId = maxIdResults[0].maxId + 1;
            }

            // Hash the password if the customer ID is greater than or equal to 15
            if (nextCustId >= 15) {
                bcrypt.hash(password, 10, (hashErr, hashed) => {
                    if (hashErr) {
                        console.error('Error hashing password:', hashErr.message);
                        return res.status(500).json({ error: 'Internal server error' });
                    }
                    hashedPassword = hashed;
                    insertUser();
                });
            } else {
                insertUser();
            }
        });
    });

    function insertUser() {
        db.query(
            'INSERT INTO Customer (Cust_ID, Cust_Name, Cust_UserName, Cust_Password, Cust_Email, Cust_PhNo, Cust_DOB, Cust_Address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nextCustId, name, username, hashedPassword, email, phone, dob, address],
            (err) => {
                if (err) {
                    console.error('Error during signup:', err.message);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                res.json({ message: 'Sign-up successful' });
            }
        );
    }
});

app.post('/login', async (req, res) => {
    const { username, password, userType } = req.body;
    let query;
    let table;

    switch (userType) {
        case 'Customer':
            query = 'SELECT Cust_ID, Cust_Name, Cust_UserName, Cust_Password FROM Customer WHERE Cust_UserName = ?';
            table = 'Customer';
            break;
        case 'Restaurant':
            query = 'SELECT Rest_ID, Rest_Name, Rest_UserName FROM Restaurant WHERE Rest_UserName = ? AND Rest_Password = ?';
            table = 'Restaurant';
            break;
        case 'Admin':
            query = 'SELECT Admin_ID, Admin_Name, Admin_Username, Admin_Password FROM Admins WHERE Admin_Username = ?';
            table = 'Admins';
            break;
        default:
            return res.status(400).json({ error: 'Invalid user type' });
    }

    try {
        db.query(query, [username], (err, results) => {
            if (err) {
                console.error('Error during login:', err.message);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.length > 0) {
                const user = results[0];

                if (userType === 'Admin' && user.Admin_Password === password) {
                    return res.status(200).json({ message: 'Login successful', user, userType: table });
                }

                if (userType === 'Customer' && user.Cust_ID >= 16) {
                    // Hash the provided password for customers with ID greater than or equal to 15
                    bcrypt.compare(password, user.Cust_Password, (bcryptErr, isValidPassword) => {
                        if (bcryptErr) {
                            console.error('Error comparing passwords:', bcryptErr);
                            return res.status(500).json({ error: 'Internal server error' });
                        }

                        if (!isValidPassword) {
                            return res.status(401).json({ error: 'Invalid credentials' });
                        }

                        return res.status(200).json({ message: 'Login successful', user, userType: table });
                    });
                } else {
                    if (password !== user.Cust_Password) {
                        return res.status(401).json({ error: 'Invalid credentials' });
                    }

                    return res.status(200).json({ message: 'Login successful', user, userType: table });
                }
            } else {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/feedback', async (req, res) => {
    try {
        const { Cust_ID, Cust_Name, ratings, feedback } = req.body;
        const newFeedback = new Feedback({
            Cust_ID,
            Cust_Name,
            ratings,
            feedback,
        });
        await newFeedback.save();
        res.status(200).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error submitting feedback:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.listen(8081, () => {
    console.log("listening");
})

app.get('/feedback', async (req, res) => {
    try {
        const recentFeedback = await Feedback.find().sort({ createdAt: -1 }).limit(5);
        return res.json(recentFeedback.map(feedback => ({ name: feedback.Cust_Name, feedback: feedback.feedback, ratings: feedback.ratings })));
    } catch (error) {
        console.error('Error fetching feedback:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

const generateOrderId = () => {
    return new Promise((resolve, reject) => {
        // Query the database to find the maximum order ID
        db.query('SELECT MAX(Orders_ID) AS maxOrderId FROM Orders', (err, result) => {
            if (err) {
                console.error('Error retrieving max order ID:', err);
                reject(err);
            } else {
                // Extract the maximum order ID from the query result
                const maxOrderId = result[0].maxOrderId || 0;
                // Increment the maximum order ID by 1 to generate the next order ID
                const nextOrderId = maxOrderId + 1;
                resolve(nextOrderId);
            }
        });
    });
};


app.post("/checkout", (req, res) => {
    const { user_id, cart } = req.body;
    db.query('SELECT MAX(Orders_ID) AS maxId FROM Orders', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        let nextOrderId = 1; // Default value if no records exist
        if (results.length > 0 && results[0].maxId) {
            nextOrderId = results[0].maxId + 1;
        }


        // Insert into Orders table
        db.query(
            "INSERT INTO Orders (Orders_ID, Orders_Date, Orders_Status, Orders_Ratings, Orders_Amount, Cust_ID) VALUES (?, ?, ?, ?, ?, ?)",
            [nextOrderId, new Date().toISOString().slice(0, 10), "Delivering", 5, calculateTotalAmount(cart), user_id],
            (err, result) => {
                if (err) {
                    console.error("Error inserting into Orders table:", err);
                    return res.status(500).json({ error: "Internal server error" });
                }

                // Insert into OrderItems table
                const orderItemsValues = cart.map((item) => [
                    item.Food_ID,
                    nextOrderId,
                    item.Rest_ID,
                    item.Food_Qty,
                ]);
                db.query(
                    "INSERT INTO OrderItems (Food_ID, Orders_ID, Rest_ID, Quantity) VALUES ?",
                    [orderItemsValues],
                    (err, result) => {
                        if (err) {
                            console.error("Error inserting into OrderItems table:", err);
                            return res.status(500).json({ error: "Internal server error" });
                        }
                        setTimeout(() => {
                            const updateQuery = `
                                UPDATE Orders
                                SET Orders_Status = 'Delivered'
                                WHERE Orders_Status = 'Delivering' AND Orders_ID = ?
                            `;
                            db.query(updateQuery, [nextOrderId], (err, result) => {
                                if (err) {
                                    console.error("Error updating order status:", err);
                                } else {
                                    console.log("Order status updated to 'Delivered' for Order ID:", nextOrderId);
                                }
                            });
                        }, 5 * 60 * 1000); 
                        return res.status(200).json({ message: "Order added successfully" });
                    }
                );
            }
        );
    });
});

// Function to calculate total amount based on cart items
const calculateTotalAmount = (cart) => {
    return cart.reduce((total, item) => total + item.Food_Qty * item.Price, 0);
};


app.get('/orders/recent', (req, res) => {
    const sql = `
    SELECT DISTINCT
    Orders.Orders_ID,
    Orders.Orders_Date,
    Orders.Orders_Status,
    Orders.Orders_Ratings,
    Orders.Orders_Amount,
    Customer.Cust_Name AS customerName,
    Restaurant.Rest_Name AS restaurantName
    FROM 
        Orders 
    INNER JOIN 
        Customer ON Orders.Cust_ID = Customer.Cust_ID
    INNER JOIN 
        OrderItems ON Orders.Orders_ID = OrderItems.Orders_ID
    INNER JOIN 
        Restaurant ON OrderItems.Rest_ID = Restaurant.Rest_ID
    ORDER BY 
        Orders.Orders_Date DESC
    LIMIT 
        5;`;

    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching recent orders:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(data);
    });
});


app.get('/orders/:cust_id', (req, res) => {
    const custId = req.params.cust_id;
    const sql = `
        SELECT
            Orders.Orders_ID,
            DATE_ADD(Orders.Orders_Date, INTERVAL 1 DAY) AS Orders_Date,
            Orders.Orders_Status,
            Orders.Orders_Ratings,
            MAX(Orders.Orders_Amount) AS Orders_Amount,
            Food.Food_Name,
            Restaurant.Rest_Name
        FROM 
            Orders 
        INNER JOIN 
            OrderItems ON Orders.Orders_ID = OrderItems.Orders_ID
        INNER JOIN 
            Food ON OrderItems.Food_ID = Food.Food_ID
        INNER JOIN 
            Restaurant ON OrderItems.Rest_ID = Restaurant.Rest_ID
        WHERE 
            Orders.Cust_ID = ?
        GROUP BY 
            Orders.Orders_ID, Orders.Orders_Date, Orders.Orders_Status, Food.Food_Name, Restaurant.Rest_Name`;;
    db.query(sql, [custId], (err, data) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Orders fetched successfully:', data);
        return res.json(data);
    });
});