import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  ListSubheader,
  Tooltip,
  Grid,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import BuildIcon from "@material-ui/icons/Build";
import { useDispatch, useSelector } from "react-redux";
import Layout from "components/Layout";
import PatchProduct from "containers/Forms/PatchProduct";
import { Link } from "react-router-dom";

import { loadSingleProduct, loadAuthMe } from "actions/sagaWatcherActions";
import Header from "containers/Header";
import BackBtn from "components/Buttons/BackBtn";
import { getProduct, getUser } from "selectors";
import { deleteProduct } from "actions/sagaWatcherActions";
import { productHasOwnerId } from "utils/filters";
import { getAuthToken } from "utils/tokenUtils";
import ErrorBoundary from "components/ErrorBoundary";

const useStyles = makeStyles({
  wrapper: {
    textDecoration: "none",
    color: "#ddd",
  },
  text: {
    width: "50%",
    margin: "0 auto",
  },
  subTitle: {
    fontSize: "25px",
  },
  flex: {
    display: "flex",
    justifyContent: "space-around",
  },
  delete: {
    fontSize: "40px",
    cursor: "pointer",
  },
  relative: {
    zIndex: 1,
    position: "relative",
  },
});

const SingleProduct = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  let { title, description, owners, deleted, status } = useSelector(getProduct);
  const { id, loggedIn } = useSelector(getUser);
  const token = getAuthToken();
  const hasOwnerId = productHasOwnerId(owners, id);

  useEffect(() => {
    if (token && !id) {
      dispatch(loadAuthMe());
    }
  }, [dispatch, loggedIn, id, token]);

  useEffect(() => {
    dispatch(loadSingleProduct());
  }, [dispatch, title, description]);

  const deleteHandler = () => {
    dispatch(deleteProduct());
  };

  const showHandler = () => {
    setShow(!show);
  };

  const renderOwners = (owners, styles) => {
    if (Array.isArray(owners)) {
      return owners.map(({ id, name, email, avatar }) => {
        return (
          <Link className={styles.wrapper} key={email} to={`/owners/${id}`}>
            <ListItem button>
              <ListItemIcon>
                <Avatar variant="rounded" src={avatar} />
              </ListItemIcon>
              <ListItemText primary={name} />
              <ListItemText primary={email} />
            </ListItem>
          </Link>
        );
      });
    } else return null;
  };

  return (
    <>
      <ErrorBoundary>
        <Header />
        {!deleted ? (
          <Layout>
            <Typography
              color="primary"
              align="center"
              variant="h3"
              component="h1"
              gutterBottom={true}
            >
              {title}
            </Typography>
            <Typography
              color="primary"
              paragraph={true}
              align="center"
              variant="body2"
              component="p"
            >
              {description}
            </Typography>
            <List
              aria-labelledby="owners"
              subheader={
                <ListSubheader
                  className={styles.subTitle}
                  component="h2"
                  id="owners"
                >
                  <Grid className={styles.relative} container>
                    <Grid item md={9}>
                      Owners
                    </Grid>
                    {hasOwnerId ? (
                      <Grid className={styles.flex} item md={3}>
                        <Tooltip title="Change Product" arrow>
                          <BuildIcon
                            onClick={showHandler}
                            className={styles.delete}
                          />
                        </Tooltip>
                        <Tooltip title="Delete Product" arrow>
                          <DeleteForeverIcon
                            onClick={deleteHandler}
                            className={styles.delete}
                          />
                        </Tooltip>
                      </Grid>
                    ) : null}
                  </Grid>
                </ListSubheader>
              }
            >
              {renderOwners(owners, styles)}
              {
                //Patch form
              }
              {show ? (
                <PatchProduct
                  title={title}
                  description={description}
                  status={status}
                />
              ) : null}
              <Link className={styles.wrapper} to="/">
                <BackBtn>Back</BackBtn>
              </Link>
            </List>
          </Layout>
        ) : (
          <Layout>
            <Alert className={styles.alert} variant="filled" severity="info">
              Product had Deleted!
            </Alert>
            <Grid container>
              <Grid item xs={1} md={8}></Grid>
              <Grid item xs={11} md={4}>
                <Link className={styles.wrapper} to="/">
                  <BackBtn>Go to Products</BackBtn>
                </Link>
              </Grid>
            </Grid>
          </Layout>
        )}
      </ErrorBoundary>
    </>
  );
};

export default SingleProduct;
