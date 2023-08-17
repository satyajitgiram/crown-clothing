import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../contexts/cart.context'
import './checkout.styles.scss';

export const Checkout = () => {
    const { cartItems, addItemToCart } = useContext(CartContext)


  return (
    <>
    <div>Checkout page</div>
    <div>
        {cartItems.map((cartItem) => {
    const { id, name, quantity } = cartItem
    return (
        <div key={id}>
            <h2>{name}</h2>
            <span>{quantity}</span><br/>
            <span onClick={()=> addItemToCart(cartItem)}>increment</span> &nbsp;&nbsp;
            <span>Decrement</span>
        </div>
        )}
    )}
    </div>
    </>
  )
}
