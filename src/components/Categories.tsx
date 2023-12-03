import React from "react";
import { useDispatch } from "react-redux";

import { setActiveCategory } from "../redux/filter/slice";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

type CategoriesProps = {
  categoryId: number;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId }) => {
    const dispatch = useDispatch();

    return (
      <div className="categories">
        <ul>
          {categories.map((category, categoryIndex) => (
            <li
              key={categoryIndex}
              onClick={() => dispatch(setActiveCategory(categoryIndex))}
              className={categoryId === categoryIndex ? "active" : ""}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
