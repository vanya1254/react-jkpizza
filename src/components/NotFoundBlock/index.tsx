import React from "react";

import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <h1 className={styles.title}>Ничего не&nbsp;найдено</h1>
      <p className={styles.description}>
        К&nbsp;сожалению, не&nbsp;удалось получить пиццы. Попробуйте повторить
        попытку позже.
      </p>
    </div>
  );
};
