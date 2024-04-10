// import React from "react";

const cartReducer = (state, action) => {
    if(action.type === "ADD_TO_CART") {
        let {amount, menuItem, restID} = action.payload;
        // console.log(
        //     "menuItem data",     
        //     menuItem             // Checking the transfer of menuItem details
        // );


        let cartProduct;

        cartProduct = {
            Food_ID: menuItem.Food_ID,
            Food_Name: menuItem.Food_Name,
            Food_Qty: amount,
            Price: menuItem.Price,
            ImageURL: menuItem.ImageURL,
            max_stock: 6,
            Rest_ID: restID
        };

        return {
            ...state,
            cart: [...state.cart, cartProduct],
        };

    }
    return state;
};

export default cartReducer;