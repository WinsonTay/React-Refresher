import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-test-78642-default-rtdb.asia-southeast1.firebasedatabase.app/carts.json"
      );
      if (!response.ok) {
        throw new Error("Getting Cart data failed");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
            items: cartData.items || [],
            totalQuantity:cartData.totalQuantity

      }));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Fetching Data Failed",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending Cart Data!",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-test-78642-default-rtdb.asia-southeast1.firebasedatabase.app/carts.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items || [],
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending Cart data failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed",
        })
      );
    }
  };
};
