import classes from './CartButton.module.css';
import {useSelector, useDispatch} from 'react-redux';
import { uiActions } from '../../store/ui-slice';
const CartButton = (props) => {
 const dispatch = useDispatch();
 const cart = useSelector(state => state.cart)

 const toggleCartHandler = () => {
    dispatch(uiActions.toggle())
 }
  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cart.totalQuantity}</span>
    </button>
  );
};

export default CartButton;
