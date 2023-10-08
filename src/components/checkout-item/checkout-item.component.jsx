import { RemoveButton, ImageContainer, CheckoutItemContainer, Image } from './checkout-item.styles.jsx';
import { useContext } from 'react';


import React from 'react'
import { CartContext } from '../../contexts/cart.context';

export const CheckoutItem = ({cartItem}) => {
    const { clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext)
    
    const clearItemHandler = () => clearItemFromCart(cartItem)
    const addItemHandler = () => addItemToCart(cartItem)
    const removeItemHandler = () => removeItemFromCart(cartItem)

    const { name, quantity, price, imageUrl } = cartItem
  return (
    <CheckoutItemContainer>
        <ImageContainer>
            <Image src={imageUrl} alt={`${name}`} />
        </ImageContainer>
        <span className="name">{name}</span>
        <span className="quantity">
                <div className="arrow" onClick={removeItemHandler}> &#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler}> &#10095; </div>
            </span>
        <span className="price">{price}</span>
        <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>

  )
}
