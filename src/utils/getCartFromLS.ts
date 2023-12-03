import { CartItemType } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cartItems");
  const cartItems: CartItemType[] = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(cartItems);

  return {
    cartItems,
    totalPrice,
  };
};
