/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-29 16:59:49
 * @LastEditTime: 2020-10-29 17:16:40
 * @FilePath: /koala-frontend/src/store/reducers/global.ts
 */

import { IReduxAction } from 'src/interface/global';
import { UPDATE_PAGE_CHANGE_GET_DATA_TYPE } from '../constants';

/**
 * 页面跳转后是否需要更新数据
 * @param data
 * @param actions
 */
export const pageChangeGetDataType = (
  data: boolean = false,
  actions: IReduxAction<boolean>,
): boolean => {
  switch (actions.type) {
    case UPDATE_PAGE_CHANGE_GET_DATA_TYPE:
      return actions.data;
    default:
      return data;
  }
};
