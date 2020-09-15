/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 15:36:56
 * @LastEditTime: 2020-09-15 14:08:29
 * @FilePath: /koala-frontend/src/store/reducers/index.ts
 */

import { combineReducers } from 'redux';
import * as user from './user';
import * as product from './product';
import * as shoppingAddress from './shoppingAddress';
import { IReducers } from './interface';

export default combineReducers<IReducers>({
  ...user,
  ...product,
  ...shoppingAddress,
});
