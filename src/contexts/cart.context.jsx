import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd ) =>{
    // find if cartItems contains ProducToAdd
    const existingItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id );

    // if found, increment quantity
    if(existingItem){
        return cartItems.map((cartItem)=> cartItem.id === productToAdd.id ? { ...cartItem, quantity:cartItem.quantity +1 } : cartItem);
    }

    // return new array with modified cartItems/ new cart items
    return [...cartItems, {...productToAdd, quantity:1}];
}

const removeCartItem = (cartItems, cartItemToRemove ) =>{
    // find if cartItems contains ProducToAdd
    const existingItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id );

    // if found, Decrement quantity
    if(existingItem.quantity === 1){
        return cartItems.filter(cartItem=>cartItem.id !== existingItem.id)
    }

    // return new array with modified cartItems/ reduced cart items
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
    cartCount: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    
    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=>total+cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));

    }
    const removeItemFromCart = (cartItemToRemove)=>{
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear)=>{
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount}; 

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
