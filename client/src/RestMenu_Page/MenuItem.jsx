/* eslint-disable react/prop-types */
import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
import CartAmountToggle from "./CartAmountToggle";
import "./MenuItem.css";
import { useCartContext } from "./cartContext";

const MenuItem = ({key, menuItem, restID, cartQuantity, setCartQuantity}) => {
    const { addToCart } = useCartContext();

    const [amount,setAmount] = useState(0);
    // const navigate = useNavigate();

    const setDecrease = () => {
      amount > 0 ? setAmount(amount - 1) : setAmount(0);
      if(cartQuantity > 0)
        setCartQuantity(cartQuantity - 1);
    };

    const setIncrease = () => {
      amount < 6 ? setAmount(amount + 1) : setAmount(6);  // Max only 6 items can be purchased of same item
      amount < 6 ? setCartQuantity(cartQuantity + 1) : setCartQuantity(cartQuantity);
    };

    
    return(
        <div key={key} className="menu-item-card">
            <div className="food-data">
              <h2>{menuItem.Food_Name}</h2>
              <p><b>Price:</b> ₹{menuItem.Price}</p>
              <p><b>Calories:</b> {menuItem.Calories}</p>
              <p><b>Description:</b> {menuItem.Food_Description}</p>
            </div>
            <div className="food-count">
              <img className="food-image" src={menuItem.ImageURL} alt={menuItem.Food_Name}/>
              {/* Add To Cart */}
              <CartAmountToggle amount={amount} setDecrease={setDecrease} setIncrease={setIncrease}/>
              <button className="addCart-btn" onClick={() => {if(amount > 0) addToCart(amount, menuItem, restID)}} >Add To Cart</button>
            </div>

        </div>
    )
};

export default MenuItem;