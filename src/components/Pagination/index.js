import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "selectors";
import { loadProductsPage } from "actions/sagaWatcherActions";

const useStyles = makeStyles(theme => ({
  wrapper: {
    "& ul": {
      justifyContent: "center"
    }
  }
}));

const Paginator = () => {
  const styles = useStyles();
  const { meta } = useSelector(getProducts);
  const dispatch = useDispatch();

  const handleChange = (event, page) => {
    event.preventDefault();
    dispatch(loadProductsPage(page));
  };

  return (
    <div>
      <Pagination
        color="primary"
        className={`${styles.wrapper} ${styles.root}`}
        count={meta.last_page}
        shape="rounded"
        size="large"
        hidePrevButton
        hideNextButton
        onChange={handleChange}
      />
    </div>
  );
};

export default Paginator;
