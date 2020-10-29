/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-29 16:57:24
 * @LastEditTime: 2020-10-29 17:00:28
 * @FilePath: /koala-frontend/src/store/actions/global.ts
 */

import { IReduxAction } from 'src/interface/global';
import { UPDATE_PAGE_CHANGE_GET_DATA_TYPE } from '../constants';

/**
 * 更新页面切换是否请求数据状态
 * @param data
 */
export const updatePageChangeGetDataType = (
  data: boolean,
): IReduxAction<boolean> => ({
  type: UPDATE_PAGE_CHANGE_GET_DATA_TYPE,
  data,
});
