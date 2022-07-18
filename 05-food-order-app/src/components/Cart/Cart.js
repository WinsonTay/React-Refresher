import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Modal from "../UI/Modal";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartContext = useContext(CartContext);
  const totalAmount = `$ ${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;
  const cartItemAddHandler = (item) => {
    cartContext.addItem(item);
  };
  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, { ...item, amount: 1 })}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch(
      "https://react-test-78642-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userData,
          orderedItems: cartContext.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart();
  };
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes["button"]} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const isSubmittingContent = <p>Submitting Order ...</p>;
  const orderContent = (
    <React.Fragment>
      {cartItems}
      <div>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckout && (
          <Checkout
            onSubmitUserData={submitOrderHandler}
            onCancel={props.onClose}
          />
        )}
        {!isCheckout && modalActions}
      </div>
    </React.Fragment>
  );
  const didSubmitContent = (
    <React.Fragment>
      <p>Successfully Submit Order !</p>
      <button className={classes["button"]} onClick={props.onClose}>
        Close
      </button>
    </React.Fragment>
  );

  return <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && orderContent}
      {isSubmitting && !didSubmit && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmitContent}

  </Modal>;
};
export default Cart;
