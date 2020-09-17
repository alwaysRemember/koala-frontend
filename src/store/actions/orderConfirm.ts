import { IReduxAction } from 'src/interface/global';
/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-15 17:48:56
 * @LastEditTime: 2020-09-15 17:55:20
 * @FilePath: /koala-frontend/src/store/actions/orderConfirm.ts
 */

import { IOrderConfirmDefaultParams } from 'src/pages/OrderConfirm/interface';
import { UPDATE_ORDER_CONFIRM_PRODUCT_LIST } from '../constants';

/**
 * 设置下单产品
 * @param data
 */
export const updateOrderConfirmProductList = (
  data: Array<IOrderConfirmDefaultParams>,
): IReduxAction<Array<IOrderConfirmDefaultParams>> => ({
  type: UPDATE_ORDER_CONFIRM_PRODUCT_LIST,
  data,
});
