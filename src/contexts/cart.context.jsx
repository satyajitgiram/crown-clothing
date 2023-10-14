import { createContext, useReducer } from "react";
import toast from "react-hot-toast";

const addCartItem = (cartItems, productToAdd ) =>{
    // find if cartItems contains ProducToAdd
    const existingItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id );

    // if found, increment quantity
    if(existingItem){
        toast.success("Item Added to cart")
        return cartItems.map((cartItem)=> cartItem.id === productToAdd.id ? { ...cartItem, quantity:cartItem.quantity +1 } : cartItem);
    }

    // return new array with modified cartItems/ new cart items
    toast.success("Item Added to cart")
    return [...cartItems, {...productToAdd, quantity:1}];
}

const removeCartItem = (cartItems, cartItemToRemove ) =>{
    // find if cartItems contains ProducToAdd
    const existingItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id );

    // if found, Decrement quantity
    if(existingItem.quantity === 1){
        toast.success("Item Removed from cart")
        return cartItems.filter(cartItem=>cartItem.id !== existingItem.id)
    }

    // return new array with modified cartItems/ reduced cart items
    toast.success("Item Removed from cart")
    return cartItems.map((cartItem)=> cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity:cartItem.quantity - 1 } : cartItem);
}

const clearCartItem = (cartItems, cartItemToClear) =>{
    const existingItem = cartItems.find((cartItem) => cartItem.id === cartItemToClear.id);
    
    if (existingItem){
        return cartItems.filter(cartItem=>cartItem.id !== existingItem.id)
    }
    return 
}


export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemToCart: () =>{},
    removeItemFromCart: () =>{},
    clearItemFromCart: () =>{},
    cartCount: 0,
    cartTotal: 0
})



export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
}


const INITIAL_STATE = {
    isCartOpen:false,
    cartItems:[],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) =>{
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen:payload
            }
        default:
            throw new Error(`Invalid action type in Cart Reducer - type: ${type}`)
    }
}



export const CartProvider = ({children}) => {
    const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems)=>{
        const newCartCount = newCartItems.reduce((total, cartItem)=>total+cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem)=>total + cartItem.quantity * cartItem.price, 0);

        dispatch({type:CART_ACTION_TYPES.SET_CART_ITEMS, payload:{cartItems:newCartItems,cartTotal:newCartTotal, cartCount:newCartCount}});


    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);

    }
    const removeItemFromCart = (cartItemToRemove)=>{
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear)=>{
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) =>{
        dispatch({type:CART_ACTION_TYPES.SET_IS_CART_OPEN, payload:bool});
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal}; 

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
