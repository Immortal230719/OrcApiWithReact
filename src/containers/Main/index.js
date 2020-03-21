import React, { useEffect } from "react";
import { Typography, GridList, GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Layout from "components/Layout";
import Product from "components/Product";
import Paginator from "components/Pagination";

import { loadProducts } from "actions/sagaWatcherActions";
import { getProducts } from "selectors";

const useStyles = makeStyles(theme => ({
  gridList: {
    width: "100%",
    height: "fitcontent"
  },
  progress: {
    width: "100%",
    height: "6px"
  }
}));

const Main = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const { data } = products;

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const styles = useStyles();

  const renderProducts = data => {
    if (data) {
      return (
        <>
          <GridList
            className={styles.gridList}
            cellHeight={360}
            cols={4}
            spacing={4}
          >
            {data.map(product => {
              return (
                <GridListTile key={product.id}>
                  <Product product={product} />
                </GridListTile>
              );
            })}
          </GridList>
          <Paginator />
        </>
      );
    }
  };

  return (
    <Layout>
      <Typography
        color="textSecondary"
        variant="h2"
        component="h2"
        align="center"
        gutterBottom={true}
      >
        Products
      </Typography>
      {renderProducts(data)}
    </Layout>
  );
};

export default Main;
