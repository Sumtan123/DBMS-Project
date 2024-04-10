// import star from "../assets/Images/star-icon.png";
// import KakalKaiRuchi from "../assets/Images/Rest1_KakalKaiRuchi.jpeg";
import { useNavigate } from "react-router-dom";
import "./Restaurant_Card.css"

function Restaurant_Card(Rest) {
    const navigate = useNavigate();
    const navToMenu = () => navigate(Rest.RestMenuLink);
    return (
        <div className="RestPage-Card" onClick={navToMenu}>
            <img src={Rest.RestImage} alt={`${Rest.RestName} Image`} className="RestCard-image"/>
            <div className="RestCard-desc">
                <p className="RestCard-restName">{Rest.RestName}</p>
                <div className="RestCardflex">
                    {/* <p className="RestCard-deliTime inline-Block">{Rest.RestDeliveryTime}</p> */}
                    <p className="RestCard-ratings inline-Block">{Rest.RestRatings} ⭐</p>
                </div>
                <p className="RestCard-cuisine">{Rest.CuisineTypes}</p>
            </div>
        </div>
    )
}

export default Restaurant_Card;