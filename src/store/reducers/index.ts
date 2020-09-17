/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 15:36:56
 * @LastEditTime: 2020-09-15 17:54:19
 * @FilePath: /koala-frontend/src/store/reducers/index.ts
 */

import { combineReducers } from 'redux';
import * as user from './user';
import * as shoppingAddress from './shoppingAddress';
import * as orderConfirm from './orderConfirm';
import { IReducers } from './interface';

export default combineReducers<IReducers>({
  ...user,
  ...shoppingAddress,
  ...orderConfirm,
});
