import React from "react";
import { useDispatch } from "react-redux";
import { setActiveSortType } from "../redux/filter/slice";
import { SortType } from "../redux/filter/types";

export const typesSort: SortType[] = [
  { name: "популярности (DESC)", sortProperty: "rating" },
  { name: "популярности (ASC)", sortProperty: "-rating" },
  { name: "цене (DESC)", sortProperty: "price" },
  { name: "цене (ASC)", sortProperty: "-price" },
  { name: "алфавиту (DESC)", sortProperty: "title" },
  { name: "алфавиту (ASC)", sortProperty: "-title" },
];

type SortTypeProps = {
  sortType: SortType;
};

export const Sort: React.FC<SortTypeProps> = React.memo(({ sortType }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = React.useState(false);

  const sortRef = React.useRef<HTMLDivElement>(null);

  const onClickTypeSort = (typeSort: SortType) => {
    dispatch(setActiveSortType(typeSort));
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      let target = event.target as HTMLElement;

      if (target.parentElement !== sortRef.current) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutSide);

    return () => document.body.removeEventListener("click", handleClickOutSide);
  }, []);

  return (
    <div className="sort">
      <div ref={sortRef} className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          ></path>
        </svg>
        <b>Сортировка&nbsp;по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortType.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {typesSort.map((type, typeIndex) => (
              <li
                key={typeIndex}
                onClick={() => onClickTypeSort(type)}
                className={
                  sortType.sortProperty === type.sortProperty ? "active" : ""
                }
              >
                {type.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
