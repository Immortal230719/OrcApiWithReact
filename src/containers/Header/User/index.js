import React from 'react';
import { useDispatch } from 'react-redux';

import LogoutBtn from 'components/Buttons/LogoutBtn';

import { logoutAction } from 'actions/sagaWatcherActions';

const User = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction())
  }

  return (
    <div>
      <LogoutBtn clickHandler={logoutHandler} />
    </div>
  )
}

export default User;