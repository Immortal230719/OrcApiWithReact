import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import logo from 'components/Logo/logo.svg';

const useStyles = makeStyles({
  logo: {
    width: '60px',
    height: '60px',
    marginRight: '15px',
  },
  text: {
    fontSize: '50px',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    textDecoration: 'none',
  },
});

const Logo = () => {
  const styles = useStyles();
  return (
    <Link className={styles.wrapper} to='/'>
      <img className={styles.logo} src={logo} alt='logo' />
      <Typography color='primary' varian='h2' component='h1'>
        Orc Api
      </Typography>
    </Link>
  );
};

export default Logo;
