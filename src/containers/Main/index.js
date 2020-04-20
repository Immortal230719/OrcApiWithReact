import React, { useEffect, useState, useRef } from "react";
import { Typography, GridList, GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import Layout from "components/Layout";
import Product from "components/Product";
import Paginator from "components/Pagination";
import Header from "containers/Header";

import { loadProducts, loadAuthMe } from "actions/sagaWatcherActions";
import { getProducts, getLoggedIn, getExpires } from "selectors";
import { checkTimeLifeToken, getAuthToken } from 'utils/tokenUtils';
import { refreshToken } from "actions/sagaWatcherActions";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

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
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector(getProducts);  
  const loggedIn = useSelector(getLoggedIn);
  const expire_in = useSelector(getExpires)
  const { data } = products;
  const token = getAuthToken()

  useInterval(() => {
    setCount(count + 1);
    let expired = checkTimeLifeToken(expire_in);  
    if (expired) {
      dispatch(refreshToken())
    }
    
  }, 60000);

  useEffect(() => { 
    if ( !data ) {
      dispatch(loadProducts());
    }       
  }, [dispatch, data]);

  useEffect(() => {
    if (!loggedIn) {
      dispatch(loadAuthMe());
    }
  }, [dispatch, loggedIn, token])

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
