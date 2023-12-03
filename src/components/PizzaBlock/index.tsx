import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToItems } from "../../redux/cart/slice";
import { CartItemType } from "../../redux/cart/types";
import { cartItemByIdSelector } from "../../redux/cart/selectors";

// import styles from "./PizzaBlock.module.scss";

type PizzaBlockProps = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

const typesThickness = ["тонкое", "традиционное"];

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  imageUrl,
  title,
  types,
  sizes,
  price,
}) => {
  const dispatch = useDispatch();

  const cartItem = useSelector(cartItemByIdSelector(id));

  const count = cartItem ? cartItem.count : 0;

  const [activeThickness, setActiveThickness] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const onClickAdd = () => {
    const item: CartItemType = {
      id,
      title,
      price,
      imageUrl,
      type: typesThickness[activeThickness],
      size: sizes[activeSize],
      count: 0, // TODO
    };

    dispatch(addToItems(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Пепперони фреш"
          />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        {/* TODO description block */}
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeIndex) => (
              <li
                key={typeIndex}
                onClick={() => setActiveThickness(typeIndex)}
                className={activeThickness === typeIndex ? "active" : ""}
              >
                {typesThickness[typeIndex]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, sizeIndex) => (
              <li
                key={sizeIndex}
                onClick={() => setActiveSize(sizeIndex)}
                className={activeSize === sizeIndex ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={() => onClickAdd()}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {count > 0 ? <i>{count}</i> : ""}
          </button>
        </div>
      </div>
    </div>
  );
};
