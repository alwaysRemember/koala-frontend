import { IReduxAction } from 'src/interface/global';
/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-15 17:51:59
 * @LastEditTime: 2020-09-15 17:55:12
 * @FilePath: /koala-frontend/src/store/reducers/orderConfirm.ts
 */

import { IOrderConfirmDefaultParams } from 'src/pages/OrderConfirm/interface';
import { UPDATE_ORDER_CONFIRM_PRODUCT_LIST } from '../constants';

/**
 * 下单的产品
 * @param data
 * @param action
 */
export const orderConfirmProductList = (
  data: Array<IOrderConfirmDefaultParams> = [],
  action: IReduxAction<Array<IOrderConfirmDefaultParams>>,
): Array<IOrderConfirmDefaultParams> => {
  switch (action.type) {
    case UPDATE_ORDER_CONFIRM_PRODUCT_LIST:
      return action.data;
    default:
      return data;
  }
};
