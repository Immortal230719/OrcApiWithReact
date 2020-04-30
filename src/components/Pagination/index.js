import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import { memoProducts, getPage } from "selectors";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    zIndex: 1,
    position: "relative",
    "& ul": {
      justifyContent: "center",
    },
  },
}));

const Paginator = ({ onChange }) => {
  const styles = useStyles();
  const { meta } = useSelector(memoProducts);
  const page = useSelector(getPage);

  return (
    <div className={styles.wrapper}>
      <Pagination
        color="primary"
        className={`${styles.wrapper} ${styles.root}`}
        count={meta.last_page}
        shape="rounded"
        hidePrevButton
        hideNextButton
        onChange={onChange}
        renderItem={(item) => {
          item.selected = item.page === page ? true : false;
          return (
            <PaginationItem size="large" selected={item.selected} {...item} />
          );
        }}
      />
    </div>
  );
};

export default Paginator;
