import "./main.scss";

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import createRootReducer from "reducers";
import rootSaga from "sagas/watchers";
import Routes from "routes";

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, routerMiddleware(history)];
const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
