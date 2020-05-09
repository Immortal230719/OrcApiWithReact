import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/Layout';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Header from 'containers/Header';
import BackBtn from 'components/Buttons/BackBtn';

const useStyles = makeStyles({
  wrapper: {
    textDecoration: 'none',
  },
});

const Owner = ({ match }) => {
  const {
    params: { id },
  } = match;
  const styles = useStyles();

  return (
    <>
      <Header />
      <Layout>
        <Typography
          color='primary'
          gutterBottom
          align='center'
          variant='h3'
          component='h1'
        >
          Owner: {id}
        </Typography>
        <Typography color='primary' paragraph variant='h5' component='strong'>
          Email
        </Typography>
        <Typography
          className={styles.title}
          paragraph
          variant='body2'
          component='p'
        >
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur
        </Typography>
        <Link className={styles.wrapper} to='/'>
          <BackBtn>Go to Products</BackBtn>
        </Link>
      </Layout>
    </>
  );
};

export default Owner;

Owner.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};
