import React from "react";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <h1 className={styles.title}>Ничего не найдено</h1>
      <p className={styles.description}>
        К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
        позже.
      </p>
    </div>
  );
};

export default NotFoundBlock;
