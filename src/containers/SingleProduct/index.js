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
import { Link } from "react-router-dom";

import { loadSingleProduct } from "actions/sagaWatcherActions";
import Header from "containers/Header";
import BackBtn from "components/Buttons/BackBtn";
import { getProduct, getUser } from "selectors";
import { deleteProduct } from "actions/sagaWatcherActions";
import { productHasOwnerId } from "utils/filters";

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
});

const SingleProduct = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  console.log(show);

  let { title, description, owners, deleted } = useSelector(getProduct);
  const user = useSelector(getUser);
  const hasOwnerId = productHasOwnerId(owners, user.id);

  useEffect(() => {
    dispatch(loadSingleProduct());
  }, [dispatch]);

  const deleteHandler = () => {
    dispatch(deleteProduct());
  };

  const showHandler = () => {
    setShow(true);
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
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                className={styles.subTitle}
                component="h2"
                id="nested-list-subheader"
              >
                <Grid container>
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
            <Link className={styles.wrapper} to="/">
              <BackBtn text="Back" />
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
                <BackBtn text="Go to Products" />
              </Link>
            </Grid>
          </Grid>
        </Layout>
      )}
    </>
  );
};

export default SingleProduct;
