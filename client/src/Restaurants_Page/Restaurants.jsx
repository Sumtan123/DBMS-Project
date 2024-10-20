import "../Restaurants_Page/Restaurants.css";
import { Navbar_RestoFood } from "../Navbar/Navbar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Restaurant_Card from "./Restaurant_Card.jsx";
import { useEffect, useState } from "react";

function Restaurants({ user, setUser }) {
    const [restaurantList, setRestaurantList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        console.log("Search Term:", searchTerm); // Debugging to check the value of searchTerm
        fetch(`http://localhost:8081/restaurant?searchTerm=${searchTerm}`)
            .then(res => res.json())
            .then(restaurantList => {
                console.log("Fetched Restaurants:", restaurantList); // Debugging to check the returned data
                setRestaurantList(restaurantList);
            })
            .catch(err => console.log(err))
    }, [searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div className="RestaurantPage">
            <Navbar_RestoFood user={user} setUser={setUser} onLogout={handleLogout} />
            <div className="RestPage-box">
                <div className="background-overlay">
                    <p className="RestPage-brandName">DineSwift</p>
                    <p className="RestPage-quote">Explore the best Restaurants in Bengaluru</p>
                </div>

                <div className="search-Container">
                    <FontAwesomeIcon icon={faSearch} />
                    <input 
                        type="text" 
                        placeholder="Search Restaurant or Food Item" 
                        className="Rest-Search" 
                        onChange={handleSearchChange} 
                    />
                </div>
            </div>

            <div className="RestList">
                {restaurantList.map((Rest) => 
                    <Restaurant_Card 
                        key={Rest.Rest_ID} 
                        RestName={Rest.Rest_Name} 
                        RestRatings={Rest.Rest_Ratings} 
                        RestImage={Rest.Rest_Image} 
                        RestMenuLink={`/menu/${Rest.Rest_ID}`} 
                        CuisineTypes={Rest.CuisineTypes}
                    />
                )}
            </div>
        </div>
    );
}

export default Restaurants;
