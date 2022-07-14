import React, { useContext } from "react";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const totalAmount = `$ ${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;
  const cartItemAddHandler = (item) =>{
    cartContext.addItem(item)
  }
  const cartItemRemoveHandler = (id) => {
      cartContext.removeItem(id)
  };

  const cartItems = (
    <ul className={classes.cart}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null,{...item, amount:1})}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  // const emptyCart = (
  //   <div>
  //     <h2> No Any Order Yet In Cart </h2>
  //   </div>
  // );

  // let display = cartContext.items.length > 0 ?  displayItem : emptyCart

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button-alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && <button className={classes["button"]}>Order</button>}
        </div>
      </div>
    </Modal>
  );
};
export default Cart;
