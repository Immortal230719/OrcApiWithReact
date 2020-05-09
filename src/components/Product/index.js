import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

import CardOwner from 'components/Product/cardOwner';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    overflow: 'inherit',
    width: '90%',
    height: '90%',
    background: 'linear-gradient(120deg, rgba(32, 32, 32), rgb(25, 25, 25))',
  },
  wrapper: {
    position: 'relative',
    zIndex: '100',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionArea: {
    height: '50%',
  },
  avatar: {
    position: 'relative',
    right: '10px',
    height: '20px',
    width: '20px',
  },
  cardActions: {
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '20px',
  },
  cardHeader: {
    textDecoration: 'none',
  },
  textColor: {
    color: '#fff',
    textShadow: '1px 1px 3px #aaa',
    overflow: 'hidden',
  },
  delete: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  },
  link: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    margin: '3px 0',
    padding: '7px 15px',
    textDecoration: 'none',
    '& p': {
      color: '#aaa',
      fontSize: '14px',
    },
  },
});

const Product = ({ userId, product: { title, slug, description, owners } }) => {
  const styles = useStyles();
  const shortDescripton = R.take(60, description);
  const hasOwnerId = owners.some((owner) => owner.id === userId);

  return (
    <div className={styles.wrapper}>
      <Card className={styles.root}>
        <Link className={styles.cardHeader} to={`/products/${slug}`}>
          <CardActionArea className={styles.actionArea}>
            <CardContent>
              <Typography
                className={styles.textColor}
                align='center'
                gutterBottom
                variant='h5'
                component='h3'
              >
                {title}
                {hasOwnerId ? (
                  <Tooltip title='Editable for you' arrow>
                    <EditIcon className={styles.delete} />
                  </Tooltip>
                ) : null}
              </Typography>
              <Typography
                className={styles.textColor}
                variant='subtitle2'
                component='p'
              >
                {shortDescripton}...
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions className={styles.cardActions}>
          {R.map(
            (owner) => (
              <CardOwner key={owner.email} owner={owner} styles={styles} />
            ),
            owners
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default Product;

Product.defaultProps = {
  userId: null,
};

Product.propTypes = {
  userId: PropTypes.number,
  product: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    description: PropTypes.string,
    owners: PropTypes.array,
  }).isRequired,
};
