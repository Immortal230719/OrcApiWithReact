import React, { useEffect } from "react";
import { Typography, GridList, GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import Layout from "components/Layout";
import Product from "components/Product";
import Paginator from "components/Pagination";
import Header from "containers/Header";

import { loadAuthMe, loadProductsPage } from "actions/sagaWatcherActions";
import { resetDeletedProduct } from "actions/syncActions";
import { getProducts, getUser, getPage } from "selectors";
import { getAuthToken } from "utils/tokenUtils";

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
  const styles = useStyles();
  const dispatch = useDispatch();

  const page = useSelector(getPage);
  const products = useSelector(getProducts);
  const { id, loggedIn } = useSelector(getUser);
  const { data } = products;
  let token = getAuthToken();

  useEffect(() => {
    if (page === 1) {
      dispatch(loadProductsPage(1));
    }
  }, [dispatch, page]);

  useEffect(() => {
    if (page !== 1) {
      dispatch(loadProductsPage(page));
    }
  }, [dispatch, page]);

  useEffect(() => {
    if (token && !id) {
      dispatch(loadAuthMe());
    }
  }, [dispatch, loggedIn, id, token]);

  useEffect(() => {
    dispatch(resetDeletedProduct());
  });

  const handleChange = (event, page) => {
    event.preventDefault();
    dispatch(loadProductsPage(page));
  };

  const renderProducts = (data) => {
    if (data) {
      return (
        <>
          <Header />
          <Paginator onChange={handleChange} />
          <GridList
            className={styles.gridList}
            cellHeight={360}
            cols={4}
            spacing={4}
          >
            {data.map((product) => {
              return (
                <GridListTile key={product.id}>
                  <Product product={product} userId={id} />
                </GridListTile>
              );
            })}
          </GridList>
          <Paginator onChange={handleChange} />
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
