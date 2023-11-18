import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

export const Pagination = ({ pages, onChangePage, limitPages }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={limitPages}
      pageCount={pages}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
