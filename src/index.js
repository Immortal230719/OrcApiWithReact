import "./main.scss";

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import createRootReducer from "reducers";
import rootSaga from "sagas/watchers";
import Routes from "routes";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Ubuntu, Montserrat"].join(",")
  },
  palette: {
    type: "dark",
    primary: {
      main: "#ddd"
    }
  }
});

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, routerMiddleware(history)];
const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
