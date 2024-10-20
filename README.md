# DineSwift Food Delivery Management System

_*This website is intended for educational purposes only, and not intended for commercial use.*_

+ DineSwift is an online food delivery management system developed using MySQL, MongoDB, React.JS, Node.JS and Express.JS. This comprehensive web application provides users with a seamless platform to order food from various restaurants comprising several cuisine types.
+ The key features of DineSwift include a Customer Care Chatbot, User profile page to display order history, random assigning of delivery boys, feedback section and so on. All these are connected to the databases in the backend.
+ DineSwift offers dynamic menu management which can be accessed through the restaurant login, through which a restaurant can add or remove food items from their menu, and dynamically change prices.
+ DineSwift also offers a robust user authentication system, enabling users to sign up and log in securely. The password is securely encrypted and stored into the database. To enhance user experience, StayZenith incorporates a visually appealing and intuitive UI design. 
+ In addition to ordering food, DineSwift includes a "Contact Us" feature, allowing users to communicate with admins for assistance.
+ A separate login for admin is also provided, where the admin is able to monitor the customers, restaurants, check recent feedbacks and orders. Analytics can also be accessed, where the admin can monitor which restaurant is performing well, and which food item is being ordered the most. 
+ Orders cart is also provided wich has adding and removing food items option. It displays the total amount and quantity of each food item ordered. 

## Images of the Website
### Home page
![DineSwift Home Page Image](/websiteimages/homepage.png)

### Restaurants page
![DineSwift Restaurants Page Image](/websiteimages/restaurantspage.png)

### Menu page
![DineSwift Menu Page Image](/websiteimages/menupage.png)

### Orders page
![DineSwift Orders Page Image](/websiteimages/orderspage.png)

### Checkout page
![DineSwift Checkout Page Image](/websiteimages/checkoutpage.png)

### Contact page
![DineSwift Contact Page Image](/websiteimages/contactpage.png)

### Login page
![DineSwift Login Page Image](/websiteimages/loginpage.png)

### Signup page
![DineSwift Signup Page Image](/websiteimages/signuppage.png)

### Userprofile page
![DineSwift Home Page Image](/websiteimages/userprofilepage.png)

### Admin page
![DineSwift Home Page Image](/websiteimages/adminpage.png)

### Restaurant Analytics 
![DineSwift Analytics Page Image](/websiteimages/analyticsdashboard.png)

### Food Item Analytics
![DineSwift Analytics Page Image](/websiteimages/analyticsdashboard2.png)

### Restaurant Login Page
![DineSwift Restaurants Page Image](/websiteimages/restaurantslogin.png)

### Chatbot page
![DineSwift Home Page Image](/websiteimages/chatbotpage.png)

## Installation and Running:

#### Give the command npm i in both the client and the server folders to install necessary packages

### MySQL installation:
1. Install MySQL on your system. You can download it from the official MySQL website: MySQL Downloads
2. Follow the installation instructions provided for your operating system.
3. During the installation process, set up a username and password for your MySQL database. Make a note of these credentials as you'll need them later.
4. Create the database referring to the MySQL_Queries file in the repository.

### MongoDB installation:
1. Install MongoDB on your system. You can download it from the official MongoDB website: MongoDB Downloads
2. Follow the installation instructions provided for your operating system.
3. Create a database in mongodb

### Setting up database credentials:
1. Navigate to the server folder and server.js file
2. Replace host_name, user_name, sql_password, database_name, mongodb_url with your database credentials
3. Save the changes to server.js

### Running the Application:
1. Start the React.JS application by navigating to the client folder and giving the command : ```npm run dev```
2. Start the Node.JS backend server by navigating the server folder and giving the command : ```npm start```
3. Start the Chatbot file by navigating to the Chatbot folder under client/src and then give the command : ```python app.py```
4. You can give own prompts and responses by changing the intents.json file and training the chatbot again using the command ```python train.py```

## Contributors
+ Sumith S Tantry
+ Tanmay S Lal 
