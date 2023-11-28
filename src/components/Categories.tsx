import { useSelector, useDispatch } from "react-redux";
import { setActiveCategory, filterSelector } from "../redux/slices/filterSlice";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC = () => {
  const dispatch = useDispatch();

  const { activeCategory } = useSelector(filterSelector);

  return (
    <div className="categories">
      <ul>
        {categories.map((category, categoryIndex) => (
          <li
            key={categoryIndex}
            onClick={() => dispatch(setActiveCategory(categoryIndex))}
            className={activeCategory === categoryIndex ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
