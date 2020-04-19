import React, { useEffect } from "react";
import { Typography, GridList, GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';


import Layout from "components/Layout";
import Product from "components/Product";
import Paginator from "components/Pagination";
import Header from "containers/Header";

import { loadProducts, loadAuthMe } from "actions/sagaWatcherActions";
import { getProducts } from "selectors";
import { getLoggedIn } from "selectors";

const useStyles = makeStyles((theme) => ({
  gridList: {
    width: "100%",
    height: "fitcontent",
  },
  title: {
    fontFamily: "Ubuntu",
    textShadow: "2px 2px 5px #acacac",
    color: "#cecece",
    padding: "100px 0 0 0",
  },
  progress: {
    width: "100%",
    height: "6px",
  },
}));

const Main = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const loggedIn = useSelector(getLoggedIn);
  const { data } = products;
  const token = Cookies.get('token')

  useEffect(() => {  
    dispatch(loadProducts());
    if (token) {
      dispatch(loadAuthMe());
    }
  }, [dispatch, loggedIn, token]);

  const styles = useStyles();

  const renderProducts = (data) => {
    if (data) {
      return (
        <>
          <Header />
          <GridList
            className={styles.gridList}
            cellHeight={360}
            cols={4}
            spacing={4}
          >
            {data.map((product) => {
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
        className={styles.title}
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
