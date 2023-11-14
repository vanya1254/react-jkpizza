import React from "react";

export const Categories = () => {
  const [activeCategory, setActiveCategory] = React.useState(0);
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
            onClick={() => setActiveCategory(categoryIndex)}
            className={activeCategory === categoryIndex ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
