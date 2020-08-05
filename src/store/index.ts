/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 15:23:05
 * @LastEditTime: 2020-08-05 15:48:37
 * @FilePath: /koala-frontend/src/store/index.ts
 */

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import reducers from "./reducers";

const middlewares = [thunkMiddleware, createLogger()];

const create = () => {
  const store = createStore(reducers, applyMiddleware(...middlewares));
  return store;
};

export default create();
