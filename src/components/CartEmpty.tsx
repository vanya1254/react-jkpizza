import React from "react";
import { Link } from "react-router-dom";

import image from "../assets/img/empty-cart.png";

export const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пустая <span>😕</span>
      </h2>
      <p>
        Вероятней всего, вы&nbsp;не&nbsp;заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на&nbsp;главную страницу.
      </p>
      <img src={image} alt="Empty cart" />
      <Link to="react-jkpizza/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};
