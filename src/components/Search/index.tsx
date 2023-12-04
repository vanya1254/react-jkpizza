import React from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";

import { setSearchValue } from "../../redux/filter/slice";

import styles from "./Search.module.scss";

export const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChangeSearchValue = (value: string) => {
    setValue(value);
    updateSearchValue(value);
  };

  const updateSearchValue = React.useCallback(
    debounce((value) => dispatch(setSearchValue(value)), 404),
    []
  );

  const onClickClear = (str: string) => {
    dispatch(setSearchValue(str));
    setValue(str);

    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#00000050"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        ></circle>
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#00000050"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        ></line>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChangeSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          className={styles.clearIcon}
          onClick={() => onClickClear("")}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"
            fill="#00000050"
          />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  );
};
