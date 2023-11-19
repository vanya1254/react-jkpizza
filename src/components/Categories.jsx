import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCategory } from "../redux/slices/filterSlice";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories = () => {
  const categoryId = useSelector((state) => state.filter.activeCategory);
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
};
