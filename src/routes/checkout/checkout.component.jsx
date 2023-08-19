import React from "react";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.scss";
import { CheckoutItem } from "../../components/checkout-item/checkout-item.component";

export const Checkout = () => {
  const { cartItems } =
    useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="heder-block">
          <span>Product</span>
        </div>
        <div className="heder-block">
          <span>Description</span>
        </div>
        <div className="heder-block">
          <span>Quantity</span>
        </div>
        <div className="heder-block">
          <span>Price</span>
        </div>
        <div className="heder-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => {
        return ( <CheckoutItem key={cartItem.id} cartItem={cartItem}/> )
      })}
      <span className="total">Total:0</span>
    </div>
  );
};
