/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 15:23:05
 * @LastEditTime: 2020-06-24 15:42:17
 * @FilePath: /koala-frontend/src/store/index.ts
 */

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import reducers from "./reducers";

const middlewares = [thunkMiddleware, createLogger()];

export default () => {
  const store = createStore(reducers, applyMiddleware(...middlewares));
  return store;
};
