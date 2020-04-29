import React, { Component } from "react";
import { connect } from "react-redux";

import Alert from "components/Alert";
import { errorAction } from "reducers/error";
// import { Redirect } from "react-router";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error) {
    const message =
      "Sorry! Something went wrong. Plaese, try to reload Application";
    this.props.dispatch(errorAction({ error: true, message: message }));
  }

  render() {
    if (this.state.hasError) {
      return <Alert />;
    }
    return <>{this.props.children}</>;
  }
}

export default connect(null, null)(ErrorBoundary);
