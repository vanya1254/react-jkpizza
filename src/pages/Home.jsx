import React from "react";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { ItemsLoadingContext } from "../context";

export const Home = () => {
  const { items, isLoading } = React.useContext(ItemsLoadingContext);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, id) => <Skeleton key={id} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>

      {/* <ul className="Pagination_root__uwB0O">
    <li className="previous disabled">
      <a
        className=" "
        tabindex="-1"
        role="button"
        aria-disabled="true"
        aria-label="Previous page"
        rel="prev"
      >
        &lt;
      </a>
    </li>
    <li className="selected">
      <a
        rel="canonical"
        role="button"
        tabindex="-1"
        aria-label="Page 1 is your current page"
        aria-current="page"
      >
        1
      </a>
    </li>
    <li>
      <a rel="next" role="button" tabindex="0" aria-label="Page 2">
        2
      </a>
    </li>
    <li>
      <a role="button" tabindex="0" aria-label="Page 3">
        3
      </a>
    </li>
    <li className="next">
      <a
        className=""
        tabindex="0"
        role="button"
        aria-disabled="false"
        aria-label="Next page"
        rel="next"
      >
        &gt;
      </a>
    </li>
  </ul> */}
    </div>
  );
};
