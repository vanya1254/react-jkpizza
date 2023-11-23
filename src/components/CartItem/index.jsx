import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addToItems,
  minusItem,
  removeItem,
  setTotalPrice,
  cartSelector,
} from "../../redux/slices/cartSlice";

export const CartItem = ({ id, title, price, imageUrl, type, size, count }) => {
  const dispatch = useDispatch();

  const { totalPrice } = useSelector(cartSelector);

  const onClickPlus = () => {
    dispatch(addToItems({ id }));
    dispatch(setTotalPrice(totalPrice + price));
  };

  const onClickMinus = () => {
    if (count > 1) {
      dispatch(minusItem(id));
    } else if (count === 1) {
      dispatch(minusItem(id));
      dispatch(removeItem(id));
    }
    dispatch(setTotalPrice(totalPrice - price));
  };

  const onClickRemove = () => {
    dispatch(setTotalPrice(totalPrice - price * count));
    dispatch(removeItem(id));
  };

  if (count === 0) {
    return;
  }

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <div
          className="button button--outline button--circle cart__item-count-minus"
          onClick={onClickMinus}
        >
          -
        </div>
        <b>{count}</b>
        <div
          className="button button--outline button--circle cart__item-count-plus"
          onClick={onClickPlus}
        >
          +
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price} ₽</b>
      </div>
      <div className="cart__item-remove">
        <div
          className="button button--outline button--circle"
          onClick={onClickRemove}
        >
          x
        </div>
      </div>
    </div>
  );
};
