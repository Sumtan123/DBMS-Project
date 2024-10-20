/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import "../RestMenu_Page/CartAmountToggle.css";

const CartAmountToggle = (props) => {
    return (
        <div className="cart-button">
            <div className="amount-toggle">
                <button onClick={() => props.setDecrease()} className="toggle-btn"><FontAwesomeIcon icon={faMinus} /></button>
                <div className="amount-style">{ props.amount }</div>
                <button onClick={() => props.setIncrease()} className="toggle-btn"><FontAwesomeIcon icon={faPlus} /></button>
                
            </div>
        </div>
    )
}

export default CartAmountToggle;