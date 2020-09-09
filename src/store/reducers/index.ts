/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 15:36:56
 * @LastEditTime: 2020-09-09 17:27:12
 * @FilePath: /koala-frontend/src/store/reducers/index.ts
 */

import { combineReducers } from 'redux';
import * as user from './user';
import * as product from './product';
import { IReducers } from './interface';

export default combineReducers<IReducers>({ ...user, ...product });
