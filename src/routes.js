import { lazy } from 'react';

import Main from 'containers/Main';
import LoginForm from 'containers/Forms/Login';
import SignUpForm from 'containers/Forms/SignUp';
import Profile from 'containers/Profile';
import SingleProduct from 'containers/SingleProduct';

const Owner = lazy(() => import('containers/Owner'));

export default () => {
  return [
    {
      path: '/',
      component: Main,
      exact: true,
    },
    {
      path: '/products/:slug',
      component: SingleProduct,
      exact: false,
    },
    {
      path: '/owners/:id',
      component: Owner,
      exact: false,
    },
    {
      path: '/sign-up',
      component: SignUpForm,
      exact: false,
    },
    {
      path: '/login',
      component: LoginForm,
      exact: false,
    },
    {
      path: '/profile',
      component: Profile,
      exact: false,
    },
  ];
};
