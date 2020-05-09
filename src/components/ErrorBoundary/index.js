import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Alert from 'components/Alert';
import { errorAction } from 'reducers/error';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    const { dispatch } = this.props;
    const message =
      'Sorry! Something went wrong. Plaese, try to reload Application';
    dispatch(errorAction({ error: true, message }));
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <Alert />;
    }
    return <>{children}</>;
  }
}

export default connect(null, null)(ErrorBoundary);

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
};
