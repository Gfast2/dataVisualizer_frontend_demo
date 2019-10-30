'use strict';

import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import bnXhr from './xhr'; // backend access

// Init / restart a data aquiring sequence
export const initMainList = () => dispatch => {
  const cb = (err, res) => {
    if (err) {
      return alert("Initialization failed!");
    }
    dispatch({
      type: 'UPDATE_MAINLIST',
      payload: [res]
    });
  };
  bnXhr({
    cb,
    req: 'init'
  });
};

// Init / restart a data aquiring sequence
export const nextData = () => dispatch => {
  const cb = (err, res) => {
    if (err) {
      return alert("Get next Data failed!");
    }
    const oldMainList = store.getState().db.mainList;
    dispatch({
      type: 'UPDATE_MAINLIST',
      payload: [...oldMainList, res]
    });
  };
  bnXhr({
    cb,
    req: 'next'
  });
};

const initState = {
  db: {
    mainList: [], // Object list, store {"index":<index>,"data":<data>,"signal":<signal>,"final":<final>}
  }
};

const db = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_MAINLIST':
      return {
        ...state,
        mainList: action.payload
      };
    default:
      return state;
  }
};

const reduxReducer = combineReducers({ db });

export let store = createStore(
  reduxReducer,
  initState,
  compose(
    applyMiddleware(ReduxThunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // devtool, Comment out when do production compiling
  )
);