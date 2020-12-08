import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'moment/locale/fr'
import IndexReducer from './indexReducer';
import IndexSagas from './indexSaga';

const sagaMiddleware = createSagaMiddleware();

//const history = createHistory();

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(
    IndexReducer,
    composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
);

// Begin our Index Saga
sagaMiddleware.run(IndexSagas);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById("root"));

serviceWorker.unregister();
