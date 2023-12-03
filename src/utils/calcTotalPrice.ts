import { CartItemType } from "../redux/cart/types";

export const calcTotalPrice = (cartItems: CartItemType[]) => {
  return cartItems.reduce((sum, item) => item.price * item.count + sum, 0);
};
