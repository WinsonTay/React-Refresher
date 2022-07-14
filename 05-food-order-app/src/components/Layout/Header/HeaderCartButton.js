import React , {useContext , useEffect , useState} from "react";
import CartContext from "../../../store/cart-context";
import CartIcon from "../../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"
const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext)
  const {items} = cartContext
  const numberOfItems = items.reduce((total,item)=> total += item.amount, 0)

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
 
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`
  
  useEffect(()=>{
    if(items.length === 0 ){
      return;
    }
    setBtnIsHighlighted(true)

    const timer = setTimeout(()=>{
      setBtnIsHighlighted(false)
    },300)

    return () =>{ 
      clearTimeout(timer)
    }
  }, [items])

  return (
    <button onClick={props.onClick} className={btnClasses}>
        <span>
            <CartIcon />
        </span>
        <span>
            Your Cart 
        </span>
        <span className={classes['badge']}>
          {numberOfItems}
        </span>
    </button>
  );
};
export default HeaderCartButton;
