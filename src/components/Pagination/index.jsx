import React from "react";
import ReactPaginate from "react-paginate";

import { useDispatch } from "react-redux";
import { setActivePage } from "../../redux/slices/filterSlice";

import styles from "./Pagination.module.scss";

export const Pagination = ({ pages }) => {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setActivePage(event.selected + 1))}
      pageCount={pages}
      // forcePage={activePage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
