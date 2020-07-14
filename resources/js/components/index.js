import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  applyMiddleware, createStore, combineReducers, compose,
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Router from './routes.js';
import reducers from '../reducers/index';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(thunk)),
);

if (document.getElementById('pediatrix')) {
  ReactDOM.render(
    <Provider store={store}>
      <Router />
    </Provider>,
    document.getElementById('pediatrix'),
  );
}
