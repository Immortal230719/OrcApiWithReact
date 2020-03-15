import "./main.css";

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import createRootReducer from "reducers";
import routes from "routes";

const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];
const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>{routes}</ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
