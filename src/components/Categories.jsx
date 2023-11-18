import React from "react";

export const Categories = ({ categoryId, onChangeCategory }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, categoryIndex) => (
          <li
            key={categoryIndex}
            onClick={() => onChangeCategory(categoryIndex)}
            className={categoryId === categoryIndex ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
