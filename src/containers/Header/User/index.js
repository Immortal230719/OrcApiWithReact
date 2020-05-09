import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { logoutAction } from 'actions/sagaWatcherActions';
import { getUser } from 'selectors';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: '#ddd',
  },
  marginR: {
    marginRight: '12px',
  },
  padding: {
    padding: '20px 40px',
  },
});

const User = () => {
  const styles = useStyles();
  const { name, avatar } = useSelector(getUser);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <div>
      <Button
        className={styles.padding}
        aria-controls='fade-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <Avatar className={styles.marginR} src={avatar} alt='avatar' />
        {name}
      </Button>
      <Menu
        id='user-menu'
        anchorEl={anchorEl}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Link className={styles.link} to='/profile'>
          <MenuItem onClick={handleClose}>
            <AccountBoxIcon className={styles.marginR} />
            Profile
          </MenuItem>
        </Link>
        <MenuItem className={styles.link} onClick={logoutHandler}>
          <ExitToAppIcon className={styles.marginR} />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default User;
