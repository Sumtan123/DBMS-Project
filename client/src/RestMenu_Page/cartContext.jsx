import { createContext, useContext, useReducer } from "react";
import reducer from "./cartReducer.jsx";

const CartContext = createContext();

const initialState = {
    cart: [],
    total_items: "",
    total_amount: "",
    shipping_fee: 30
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (amount, menuItem, restID) => {
        dispatch({ type: "ADD_TO_CART", payload: {amount, menuItem, restID} });
    }

    return <CartContext.Provider value={{...state, addToCart }} >{children}</CartContext.Provider>
};

const useCartContext = () => {
    return useContext(CartContext);
};

export { CartProvider, useCartContext };