import React from "react";
import ReactPaginate from "react-paginate";

import { useDispatch, useSelector } from "react-redux";
import { setActivePage, filterSelector } from "../../redux/slices/filterSlice";

import styles from "./Pagination.module.scss";

export const Pagination = ({ pages }) => {
  const dispatch = useDispatch();

  const { activePage } = useSelector(filterSelector);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setActivePage(event.selected + 1))}
      pageCount={pages}
      forcePage={activePage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
