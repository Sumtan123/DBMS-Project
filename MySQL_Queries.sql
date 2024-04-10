USE dineswift;
CREATE TABLE IF NOT EXISTS Food (
	Food_ID INT PRIMARY KEY,
    Food_Name VARCHAR(255) NOT NULL,
    Price INT NOT NULL,
    Calories INT NOT NULL,
    Food_Description TEXT,
    ImageURL TEXT
);

CREATE TABLE IF NOT EXISTS Restaurant (
	Rest_ID INT PRIMARY KEY,
    Rest_Name VARCHAR(255) NOT NULL,
    Rest_PhNo VARCHAR(255) NOT NULL,
    Rest_UserName VARCHAR(255) NOT NULL,
    Rest_Password VARCHAR(255) NOT NULL,
    Rest_Ratings DECIMAL(2,1) NOT NULL,
    Rest_Address TEXT,
    Rest_Image TEXT
);

CREATE TABLE Menu (
    Food_ID INT,
    Rest_ID INT,
    Price DECIMAL(8,2),
    PRIMARY KEY (Food_ID, Rest_ID),
    FOREIGN KEY (Food_ID) REFERENCES Food(Food_ID),
    FOREIGN KEY (Rest_ID) REFERENCES Restaurant(Rest_ID)
);

CREATE TABLE IF NOT EXISTS Cuisine (
    CuisineType VARCHAR(255), 
    Rest_ID INT,
    PRIMARY KEY (CuisineType, Rest_ID),
    FOREIGN KEY (Rest_ID) REFERENCES Restaurant(Rest_ID)
);

CREATE TABLE IF NOT EXISTS Customer (
	Cust_ID INT PRIMARY KEY,
    Cust_Name VARCHAR(255) NOT NULL,
    Cust_UserName VARCHAR(255) NOT NULL,
    Cust_Password VARCHAR(255) NOT NULL,
    Cust_PhNo VARCHAR(255) NOT NULL,
    Cust_DOB DATE NOT NULL,
    Cust_Email VARCHAR(255) NOT NULL,
    Cust_Address TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS DeliveryBoy (
	DeliveryBoy_ID INT PRIMARY KEY,
    DeliveryBoy_Name VARCHAR(255) NOT NULL,
    DeliveryBoy_PhNo VARCHAR(255) NOT NULL,
    DeliveryBoy_JD DATE NOT NULL,
    DeliveryBoy_Status VARCHAR(255) NOT NULL,
    DeliveryBoy_Ratings DECIMAL(2,1) NOT NULL
);

CREATE TABLE IF NOT EXISTS Orders (
	Orders_ID INT PRIMARY KEY,
    Orders_Date DATE NOT NULL,
    Orders_Status VARCHAR(255) NOT NULL,
    Orders_Ratings DECIMAL(2,1) NOT NULL,
    Orders_Amount DECIMAL(8,2) NOT NULL,
    Cust_ID INT,
    FOREIGN KEY(Cust_ID) REFERENCES Customer(Cust_ID)
);

CREATE TABLE IF NOT EXISTS OrderItems (
    Food_ID INT,
    Orders_ID INT,
    Rest_ID INT,
    Quantity INT NOT NULL,
    PRIMARY KEY (Food_ID, Orders_ID, Rest_ID),
    FOREIGN KEY (Food_ID) REFERENCES Food(Food_ID),
    FOREIGN KEY (Orders_ID) REFERENCES Orders(Orders_ID),
    FOREIGN KEY (Rest_ID) REFERENCES Restaurant(Rest_ID)
);

CREATE TABLE IF NOT EXISTS Admins (
	Admin_ID INT PRIMARY KEY,
    Admin_Name VARCHAR(255) NOT NULL,
    Admin_PhNo VARCHAR(255) NOT NULL,
    Admin_Email VARCHAR(255) NOT NULL,
    Admin_Username VARCHAR(255) NOT NULL,
    Admin_Password VARCHAR(255) NOT NULL
);

INSERT INTO Food (Food_ID, Food_Name, Price, Calories, Food_Description, ImageURL) 
VALUES
	(1, 'Vada Pav', 30, 290, 'Famous street food in Mumbai is an Indian Street food made by stuffing deep fried potato fritters and served with spicy chutneys in side of Pav.', 'https://www.cookwithmanali.com/wp-content/uploads/2018/04/Vada-Pav-500x375.jpg'),
	(2, 'Kachori', 30, 250, 'Served with spicy chole, crumbled kachori, yogurt, mint & tamarind chutney', 'https://www.vegrecipesofindia.com/wp-content/uploads/2018/03/raj-kachori-chaat-recipe-1.jpg'),
	(3, 'Bhelpuri', 55, 289, 'Savoury snack from the streets of Mumbai made with puffed rice, tossed with potatoes, onion, tomato & tangy chutneys', 'https://www.safeharvest.co.in/wp-content/uploads/2022/05/bhelpuri-bhel-is-savoury-roadside-snack-originating-from-india-is-also-type-chaat-min-min.png'),
	(4, 'Dahi Puri', 55, 367, 'Crispy puris topped with boiled potatoes, onions, tomatoes and finished off with curd and sev.', 'https://www.whiskaffair.com/wp-content/uploads/2019/05/Dahi-Puri-2-3.jpg'),
	(5, 'Bun Dabeli', 35, 199, 'Our twist to the classic kutchi dabeli from gujarat. Spicy, tangy & sweet potato filling inside a bun. Drizzled with pomegranate, onion& sev.', 'https://i.pinimg.com/originals/43/9d/7d/439d7db3e628a5e36203a7511f5cddf4.jpg'),
	(6, 'Sev Puri', 55, 171, 'A delightful blend of crispy puris topped with a variety of savory and tangy toppings, offering a burst of flavors and textures in every bite.', 'https://www.spiceupthecurry.com/wp-content/uploads/2015/05/sev-puri-1.jpg'),
	(7, 'Bun Samosa', 35, 262, 'Oven fresh bun stuffed with our signature samosa topped with spices and chutney', 'https://foodnextdoor.b-cdn.net/wp-content/uploads/2023/09/menu-845085904-1695196182_1.jpg'),
	(8, 'Samosa (1 pc)', 20, 130, 'A delectable, veggie-filled treat that packs delightful warmth and enticing aromas.', 'https://c.ndtvimg.com/2023-03/0m65kep_samosa_625x300_10_March_23.jpg'),
	(9, 'Masala Peanut Chaat', 129, 233, 'Savoury snack from the streets of Mumbai made with puffed rice, tossed with potatoes, onion, tomato & tangy chutneys', 'https://masalaandchai.com/wp-content/uploads/2020/11/Peanut-Chaat-Featured-Image.jpg'),
	(10, ' Peas Pulao', 160, 268, 'A classic indian rice made with green peas and basmati rice with whole indian spices,served with raita.', 'https://static.toiimg.com/thumb/53536333.cms?imgsize=145744&width=800&height=800'),
	(11, 'Ghee Rice', 85, 225, 'Wholesome special ghee rice with succulent layered with aromatic basmati rice', 'https://cdn1.foodviva.com/static-content/food-images/rice-recipes/ghee-rice-recipe/ghee-rice-recipe.jpg'),
	(12, 'Veg Fried Rice', 100, 289, 'Indulge in the wholesome flavors of our veg fried rice. Fragrant rice stir-fried with fresh vegetables, served with zesty green chili sauce and tangy tomato sauce. A nutritious choice!', 'https://chaturvedisweetsandnamkeen.com/wp-content/uploads/2022/10/Screenshot-2022-11-03-185352.png'),
	(13, 'Curd Rice', 69, 376, 'Curd rice is a South Indian traditional dish made with rice, fresh yogurt, tempering spices & curry leaves.', 'https://www.ohmyveg.co.uk/wp-content/uploads/2021/10/Curd-Rice-1-scaled.jpg'),
	(14, 'Chicken Dum Biryani', 180, 800, 'Chicken Biryani Is A Savory Chicken And Rice Dish That Includes Layers Of Chicken, Rice, And Aromatics That Are Steamed Together. The Bottom Layer Of Rice Absorbs All The Chicken Juices As It Cooks, Giving It A Tender Texture And Rich Flavor, While The Top Layer Of Rice Turns Out White And Fluffy Served With Mirchi Ka Salan And Raita', 'https://5.imimg.com/data5/FD/EX/GLADMIN-59821295/chicken-dum-biryani-for-lunch-500x500.png'),
	(15, 'Ambur Chicken Dum Biryani', 210, 900, 'Richly flavored aromatic rice and marinated chicken cooked in ambur stye in a flavored masala.', 'https://www.currytrail.in/wp-content/uploads/2015/03/Ambur-Chicken-Biryani-21.jpg'),
	(16, 'Hyderabadi Biryani', 219, 580, 'A delightful preparation of richly flavored aromatic rice layered with marinated chicken pieces in a delicate blend of whole spices.', 'https://static.toiimg.com/thumb/msid-102774679/102774679.jpg?width=500&resizemode=4'),
	(17, 'Mutton Biryani', 229, 352, 'Serves 1 | Classic Maratha Style Mutton Biryani served in Natural Areca Nut Leaf Packing along with Shorba & Raita.', 'https://paattiskitchen.com/wp-content/uploads/2023/03/kmc_20230323_230721.jpg'),
	(18, 'Veg Dum Biryani', 170, 241, 'Biryani with tastefully marinated and succulent pieces of paneer cooked in a rich mix of long grain rice, delicately flavoured with authentic herbs and spices', 'https://www.whiskaffair.com/wp-content/uploads/2020/08/Veg-Biryani-2-3-500x375.jpg'),
	(19, 'Veg Noodles', 95, 210, 'Super quick to make delicious Vegetable noodles made with just a handful of ingredients.Enjoy with some Chinese sides.', 'https://www.ruchiskitchen.com/wp-content/uploads/2015/05/noodles_food_1-768x512.jpg.webp'),
	(20, 'Schezwan Noodles', 129, 265, 'No artificial colours, ajinomoto, msg or any other chemicals used in the preparation.', 'https://www.cookwithmanali.com/wp-content/uploads/2021/08/Schezwan-Noodles-500x500.jpg'),
	(21, 'Paneer Noodles', 160, 398, 'A delectable combination of succulent paneer and flavorful noodles that will leave you craving for more.', 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/paneer_schezwan_noodles_zdish.png'),
	(22, 'Chicken Schezwan Noodles', 145, 300, 'Delectable noodles tossed along with assorted fresh veggies, chicken, schezwan sauce and spices - perfect to satisfy your hunger.', 'https://img.clevup.in/311544/1690147309902_ChickenSchezwanNoodles.jpeg?'),
	(23, 'Baby Corn Manchurian', 125, 200, 'An Indo-Chinese favourite, bite into this yummy dish of fresh Baby corn pieces cooked to perfection in Manchurian', 'https://www.easycookingwithmolly.com/wp-content/uploads/2020/04/baby-corn-manchurian.jpg'),
	(24, 'Paneer Chilli', 140, 250, 'A delightful and flavorful dish prepared with soft paneer, slow cooked cooked with flavorful chili sauce and other masalas.', 'https://rumkisgoldenspoon.com/wp-content/uploads/2021/04/Chilli-paneer-dry.jpg'),
	(25, 'Paneer Manchurian', 160, 264, 'A hot and spicy roll packed generously with crispy paneer Manchurian chunks', 'https://theindianclaypot.com/content/images/wp-content/uploads/2020/10/paneer-manchurian.jpg'),
	(26, 'Gobi Manchurian', 140, 264, 'Gobi Manchurian is a fabulous fusion pick, with cauliflower balls dipped in hot and sour Chinese sauces, seasoned with spices.', 'https://www.indianveggiedelight.com/wp-content/uploads/2017/06/gobi-manchurian-featured.jpg'),
	(27, 'Naan', 30, 220, 'North Indian bread', 'https://www.vegrecipesofindia.com/wp-content/uploads/2022/12/garlic-naan-3.jpg'),
	(28, 'Tandoori Roti', 30, 70, 'North Indian bread', 'https://crownresto.com/wp-content/uploads/2022/08/Tandoori-Roti-.jpg'),
	(29, 'Kulcha', 35, 150, 'North Indian bread', 'https://www.vegrecipesofindia.com/wp-content/uploads/2018/10/kulcha-recipe-1.jpg'),
	(30, 'Idli Vada Sambhar', 40, 250, 'Combination of Steamed idlis & medu served with vegetable sambhar & Chutneys.', 'https://t4.ftcdn.net/jpg/04/65/28/87/360_F_465288715_F3uc0aZMhzSbNbftEzHSb6RfUVQfCHeU.jpg'),
	(31, 'Onion Uttapam', 70, 250, 'Made with dosa batter, topped with onion and served with chutney.', 'https://images.slurrp.com/prod/recipe_images/transcribe/breakfast/Bajra-onion-uttapam.webp'),
	(32, 'Plain Dosa', 36, 150, 'Tawa- toasted, crispy and delicious dosa Served with sambar & chutney\'s.', 'https://www.ticklingpalates.com/wp-content/uploads/2022/03/plain-dosa.jpg'),
	(33, 'Masala Dosa', 45, 200, 'A semi-spicy, crispy and delicious dosa with potato masala folded into it .', 'https://www.palatesdesire.com/wp-content/uploads/2022/09/Mysore-masala-dosa-recipe@palates-desire.jpg'),
	(34, 'Paddu (8 pcs)', 60, 200, 'Indian dish made by streaming batte by mould with chutney', 'https://images.saymedia-content.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk2NjkzOTg5MjcyNTI4ODYz/rice-moong-dal-paddu-recipe.jpg'),
	(35, 'DBC (Death By Chocolate)', 120, 400, 'All the goodness of Vanilla Ice cream, chocolate sponge and nuts served with our fudgy sauce.', 'https://roamingruta.files.wordpress.com/2016/09/img_20160827_222100.jpg'),
	(36, 'Kitkat Milkshake', 80, 400, 'Creamy and indulgent, this special milkshake is a delightful blend of rich milk and a popular chocolate treat, creating a crave-worthy dessert in a glass.', 'https://www.bitensip.com/wp-content/uploads/2022/11/kit-kat-shake.jpg'),
	(37, 'Gulab Jamun (1 pc)', 25, 200, 'Indulge in a delectable, tender treat that will leave your taste buds wanting more.', 'https://aartimadan.com/wp-content/uploads/2020/11/milk-powder-gulab-jamuns.jpg'),
	(38, 'Rasamalai', 50, 250, 'Rasmalai is a popular Indian dessert made with soft and spongy cottage cheese balls soaked in sweetened milk infused with cardamom and garnished with pistachios. It offers a creamy and indulgent texture with a hint of aromatic flavors.', 'https://www.ruchiskitchen.com/wp-content/uploads/2017/02/Rasmalai-recipe-01-500x375.jpg'),
	(39, 'Carrot Halwa (100 Grms)', 98, 350, 'Carrot halwa is often flavored with cardamom and garnished with chopped nuts such as almonds or pistachios for added texture and flavor. It can be served hot or cold.', 'https://www.vidhyashomecooking.com/wp-content/uploads/2023/01/CarrotHalwaRecipe.jpg'),
	(40, 'Gudbud Sundae', 140, 400, 'Vanilla, Strawberry & Pineapple Ice creams, topped with fruit pieces, dry fruits and pineapple pulp.', 'https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/ezkvppoifkkmfebdqydh'),
	(41, 'Hot Chocolate Fudge', 139, 400, 'Simple But Perfect. Hot Chocolate Over Cold Biting Ice Cream Delicious Chocolate Sauce, Poured Over Fresh Vanilla Ice Cream And Topped With Nuts.', 'https://i.pinimg.com/474x/90/77/c5/9077c54b38027ca466d476abbc483823.jpg'),
	(42, 'Chocozilla Sundae', 180, 500, 'Chocolate ice cream, gooey chocolate cake and a chocolate bar, topped with chocolate sauce, whipped cream, crushed oreo cookies, chocolate waffles and gems.', 'https://s3.ap-south-1.amazonaws.com/shopnowchat.com/Medium/112518hcsqfleca5gl1lmctleq.png'),
	(43, 'Cookie Monster Sundae', 180, 500, 'Crushed waffle cones, vanilla ice cream, and chocolate sponge cake, topped with chocolate chips, whipped cream and crushed oreo cookies.', 'https://hips.hearstapps.com/delish/assets/17/21/1495811662-delish-cookie-monster-sundae-003.jpg'),
	(44, 'Pasta Arabiatta', 200, 350, 'Chunkey tomato & chilli flakes cooked together to farm spicy sauce.', 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/05/arrabiata-pasta-2.jpg'),
	(45, 'Crispy Veg Burger', 70, 400, 'Our Best-Selling Burger With Crispy Veg Patty, Fresh Onion And Our Signature Sauce', 'https://www.jumboking.co.in/wp-content/uploads/2023/01/Zomato_Crispy-Veg-Burger.webp'),
	(46, 'Chicken Tandoori Burger', 90, 450, 'Juicy grilled chicken infused with aromatic spices, nestled between soft buns, delivering a burst of flavors in every bite.', 'https://www.licious.in/blog/wp-content/uploads/2022/08/shutterstock_2014376390.jpg'),
	(47, 'Pineapple Pizza ', 130, 250, 'Combination of corn and pineapple in this pizza with a creamy tomato sauce.', 'https://static01.nyt.com/images/2023/03/29/multimedia/23HAMREX2-pineapple-ham-pizza-qwct/HAMREX2-pineapple-ham-pizza-qwct-superJumbo.jpg'),
	(48, 'Green Salad', 65, 100, 'Simple collection of salad vegetables in slices', 'https://hellolittlehome.com/wp-content/uploads/2022/08/garden-salad-recipe-2-500x500.jpg'),
	(49, 'Paneer Butter Masala', 240, 350, 'Paneer Butter Masala is a mouth watering preparaton of paneer, in a rich and creamy gravy for you to love and adore!', 'https://www.ruchiskitchen.com/wp-content/uploads/2020/12/Paneer-butter-masala-recipe-3-500x375.jpg'),
	(50, 'French Fries', 74, 200, 'Crispy, golden fries served with creamy, tangy mayo the perfect indulgence for fry lovers.', 'https://thecozycook.com/wp-content/uploads/2020/02/Copycat-McDonalds-French-Fries-.jpg'),
	(51, 'Garlic Breadsticks', 35, 300, 'Garlic bread consists of bread, topped with garlic and occasionally olive oil or butter and may include additional herbs, such as oregano or chives.', 'https://myfoodstory.com/wp-content/uploads/2020/12/Dominos-Style-Garlic-Breadsticks-4-500x500.jpg'),
	(52, 'Farmhouse Pizza', 450, 700, 'As the name suggests, the farmhouse pizza is loaded with various fresh vegetarian toppings. Crunchy and crisp capsicum, juicy tomatoes, and succulent mushrooms are the prime toppings in a farmhouse pizza', 'https://cdn.dotpe.in/longtail/store-items/8064953/jhvVS7hi.jpeg');

INSERT INTO Customer (Cust_ID, Cust_Name, Cust_UserName, Cust_Password, Cust_PhNo, Cust_DOB, Cust_Email, Cust_Address) 
VALUES
(1, 'Gita Singh', 'GitaSingh12ABC', 'Gita@s', '9274813495', '1979-02-23', 'gita1234@gmail.com', '12, Surya Residency, MG Road, 560001'),
(2, 'Lakshmi Biswas', 'LakshmiBiswast1206', 'Biswas@12', '9274813495', '1974-07-30', 'lakshmi23@gmail.com', '45, Green Meadows, Brigade Road, 560025'),
(3, 'Saroj Chandra', 'SarojChandraAZ35', 'Chandra*23', '9274813495', '1986-02-03', 'saroj@gmail.com', '78, Silk Haven, Bannerghatta Road, 560076'),
(4, 'Lalita Mandal', 'LalitaMandalGU78', 'Lalita78*', '9274813495', '1983-09-12', 'lalit24@gmail.com', '23, Blossom Heights, Jayanagar, 560041'),
(5, 'Shanti Chaudhari', 'ShantiChaudhari3071', 'Shanti#3421', '9274813495', '2000-01-28', 'shanti97@gmail.com', '56, Lake View Villa, Sarjapur Road, 560102'),
(6, 'Radha Begam', 'RadhaBegam1987', 'Radha!23', '9274813495', '2001-12-21', 'radha01@gmail.com', '89, Silver Springs, Whitefield, 560066'),
(7, 'Sunita Devi', 'SunitaDevi87ad', 'Sunita*35', '9274813495', '2003-10-06', 'sunita34@gmail.com', '34, Golden Towers, Malleshwaram, 560003'),
(8, 'Suman Sharma', 'SumanSharma3b7d', 'Suman*123', '9274813495', '1995-02-14', 'suman02@gmail.com', '67, Orchid Enclave, Rajajinagar, 560010'),
(9, 'Mira Gupta', 'MiraGupta9010', '#Mira78', '9274813495', '1991-08-09', 'mira91@gmail.com', '45, Tranquil Lane, Electronic City, 560100'),
(10, 'Punam Kumar', 'PunamKumar00b4', '*Punam83', '9274813495', '1972-03-23', 'punam72@gmail.com', '21, Maple Residency, HSR Layout, 560102');

INSERT INTO Admins (Admin_ID, Admin_Name, Admin_PhNo, Admin_Email, Admin_Username, Admin_Password)
VALUES 
(1, 'Sumith S Tantry', '9663867936', 'sumith.tantry@gmail.com', 'sumith_st03', 'sumthecodeguy@23'),
(2, 'Tanmay S Lal', '9513805900', 'tanmayshibulal1234@gmail.com', 'tanmay_slal12', 'tanmaythecoder@123');

INSERT INTO DeliveryBoy (DeliveryBoy_ID, DeliveryBoy_Name, DeliveryBoy_PhNo, DeliveryBoy_JD, DeliveryBoy_Status, DeliveryBoy_Ratings)
VALUES
(1, 'John', '9001008002', '2023-10-26', 'Available', 4.2),
(2, 'Kumar', '9001008001', '2024-02-12', 'Available', 4.1),
(3, 'Drake', '9001008003', '2022-05-09', 'Available', 4.3),
(4, 'Abdul', '9001008004', '2023-07-03', 'Available', 4.8);


INSERT INTO Restaurant (Rest_ID, Rest_Name, Rest_PhNo, Rest_UserName, Rest_Password, Rest_Ratings, Rest_Address, Rest_Image)
VALUES 
(1, 'Kakal Kai Ruchi', '3762100193', 'kakalkairuchi_user', 'K@k@lKa!Ruch1', 4.2, 'JP Nagar, 560078', 'https://b.zmtcdn.com/data/pictures/1/20798591/075b17549e5026a699b57a18c0a997b8.jpeg'),
(2, 'Paradise Biryani', '7778700016', 'paradisebiryani_user', 'P@r@d!seB!ry@n1', 4.1, 'HSR Layout, 560102', 'https://b.zmtcdn.com/data/pictures/2/18308792/a8b4141d7b77be6f662fad76861ec873.jpg'),
(3, 'Truffles', '2880393021', 'truffles_user', 'Truffl3s#Pwd', 4.6, 'MG Road, 560001', 'https://i.ytimg.com/vi/paJSeQKjIF4/maxresdefault.jpg'),
(4, 'Chai Point', '3925357238', 'chaipoint_user', 'Ch@!P0!nt#Pwd', 4.9, 'Hulimavu, 560076', 'https://images.squarespace-cdn.com/content/v1/5f0fff53181ec21dc70fb3b1/1605243838556-M5418IZRH9LH7B9650ON/Banner.jpg'),
(5, 'Polar Bear', '3484503652', 'polarbear_user', 'P0larB3@r#Pwd', 4.2, 'RBI Layout, 560078', 'https://polarbear.co.in/wp-content/uploads/2022/12/hsr-store-1024x473.jpg'),
(6, 'A2B (Adyar Anand Bhavan)', '3043650066', 'a2b_user', 'A2B@nand#Bh@van', 4.1, 'Kanakapura 560077', 'https://media-cdn.tripadvisor.com/media/photo-p/1b/18/b6/4b/photo9jpg.jpg'),
(7, 'Hotel Empire', '9959414023', 'hotelempire_user', 'Hot3lEmp1r3#Pwd', 4.5, 'Central Street, 560001', 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/flyfish/raw/NH25070231559596/QS1042/QS1042-Q1/images-6-.jpeg'),
(8, 'Easy Bites', '4051478506', 'easybites_user', 'E@syB1t3s#Pwd', 4.4, 'Koramangala, 560095', 'https://content.jdmagicbox.com/comp/bangalore/y3/080pxx80.xx80.190718224141.k9y3/catalogue/easy-bites-rajajinagar-bangalore-fast-food-take-away-joints-c1dsiqy37m.jpg'),
(9, 'Dominos', '4610281527', 'dominos_user', 'D0m!n0s#Pwd', 4.6, 'Puttenahalli, 560078', 'https://lh5.googleusercontent.com/p/AF1QipNEWn5WzvHMo2Y2IpmRUNoMxXWKX2UgBnQQzhA'),
(10, 'Nandhana Palace', '9080322807', 'nandhanapalace_user', 'N@ndh@na#Pal@ce', 3.9, 'Marenahalli, 560078', 'https://img.weddingbazaar.com/shaadisaga_production/photos/pictures/006/415/623/new_medium/1.jpg?1691388522'),
(11, 'Hyderabadi Bawarchi', '8393821367', 'hyderabadibawarchi_user', 'Hyd3rab@d!B@w@rch1', 4.0, 'Vidyaranyapura, 560097', 'https://d4t7t8y8xqo0t.cloudfront.net/resized/750X436/restaurant%2F689215%2Frestaurant020230623052729.jpg'),
(12, 'Hari Super Sandwich', '9126811712', 'harisupersandwich_user', 'H@riSup3rSandw!ch', 4.7, 'Jayanagar, 560011', 'https://content.jdmagicbox.com/comp/bangalore/x3/080pxx80.xx80.180328032129.n4x3/catalogue/hari-super-sandwich-jayanagar-bangalore-fast-food-8e20s.jpg'),
(13, 'McDonalds', '7775563412', 'mcdonalds_user', 'McDo@lds#Pwd', 4.8, 'JP Nagar 6th Phase, 560078', 'https://content.jdmagicbox.com/comp/bangalore/x6/080pxx80.xx80.090903145709.g9x6/catalogue/mcdonald-s-family-restaurant-new-bel-road-bangalore-fast-food-restaurants-g42jr.jpg?clr=#553311?fit=around%7C270%3A130&crop=270%3A130%3B%2A%2C%2A'),
(14, 'Biryani Zone', '1017425970', 'biryanizone_user', 'B!ry@n!Z0ne#Pwd', 4.9, 'Marathahalli, 560037', 'https://biryani.zone/wp-content/uploads/2021/12/2018-12-22-1024x768.jpg'),
(15, 'Paakashala', '8883964857', 'paakashala_user', ' P@@k@sh@la#Pwd', 4.9, 'Rajarajeshwari Nagar, 560098', 'https://content.jdmagicbox.com/comp/tumkur/a4/9999px816.x816.201208150005.h3a4/catalogue/paakashala-yediyur-tumkur-restaurants-r3epxcwepc.jpg'),
(16, 'Maiyas', '1516175724', 'maiyas_user', 'Ma!y@s#Pwd', 4.5, 'Jayanagar, 560004', 'https://imgmedia.lbb.in/media/2019/05/5cdb7c1f250a4e1bdbcc2cf3_1557888031584.jpg'),
(17, 'Srinidhi Sagar', '4091618299', 'srinidhisagar_user', 'Sr!n!dh!S@g@r#Pwd', 4.1, 'Krishnappa Garden, 560048', 'https://content.jdmagicbox.com/comp/bangalore/w9/080pxx80.xx80.140527150956.g2w9/catalogue/srinidhi-sagar-food-line-hal-2nd-stage-indiranagar-bangalore-street-food-restaurants-phmsw1yejw.jpg');

INSERT INTO Cuisine (Rest_ID, CuisineType) VALUES
(1,"South Indian"), (2,"North Indian"), (3,"American"), (3,"Desserts"), (3,"Continental"), 
(3,"Italian"), (4,"Bakery"), (4,"Beverages"), (4,"Snacks"), (5,"Desserts"), 
(6,"Soth Indian"), (6,"North Indian"), (7,"North Indian"), (7,"Kebabs"), (7,"Biryani"), 
(8,"Snacks"), (8,"Fast Food"), (8,"Beverages"), (9,"Pizzas"), (9,"Italian"), 
(9,"Pastas"), (10,"Andhra"), (11,"Biryani"), (11,"North Indian"), (11,"Chinese"), 
(12,"Fast Food"), (13,"Burgers"), (13,"Beverages"), (13,"Cafe"), (13,"Desserts"), 
(14,"South Indian"), (14,"North Indian"), (14,"Biryani"), (15,"Indian"), (15,"Chaat"), 
(15,"Chinese"), (16,"South Indian"), (17,"South Indian");

INSERT INTO Menu(Food_ID,Rest_ID,Price) VALUES
(30,1,40), (31,1,70), (32,1,36), (33,1,45), (34,1,60), (13,1,69),
(27,2,30), (28,2,30), (29,2,35), (49,2,240), (14,2,180), (15,2,210),
(45,3,70), (46,3,90), (41,3,139), (36,3,80), (44,3,200), (50,3,74),
(5,4,35), (6,4,55), (7,4,35), (9,4,129), (11,4,85), (2,4,30),
(35,5,120), (37,5,25), (38,5,50), (40,5,140), (41,5,139), (43,5,180),
(30,6,40), (31,6,70), (32,6,36), (33,6,45), (34,6,60), (27,6,30),
(11,7,85), (28,7,30), (15,7,210), (14,7,180), (17,7,229), (16,7,219),
(3,8,55), (4,8,55), (9,8,129), (6,8,55), (50,8,74), (11,8,85),
(47,9,130), (44,9,200), (50,9,74), (48,9,65), (51,9,35), (52,9,450),
(14,10,180), (29,10,35), (17,10,229), (16,10,219), (26,10,140), (25,10,160),
(14,11,180), (19,11,95), (26,11,140), (20,11,129), (49,11,240), (10,11,160),
(44,12,200), (2,12,30), (45,12,70), (46,12,90), (47,12,130), (50,12,74),
(45,13,70), (46,13,90), (42,13,180), (36,13,80), (44,13,200), (50,13,74),
(14,14,180), (18,14,170), (15,14,210), (27,14,30), (29,14,35), (28,14,30),
(19,15,95), (26,15,140), (49,15,240), (3,15,55), (4,15,55), (6,15,55),
(30,16,40), (31,16,70), (32,16,36), (33,16,45), (34,16,60), (11,16,85),
(30,17,40), (31,17,70), (32,17,36), (33,17,45), (34,17,60), (10,17,160);
