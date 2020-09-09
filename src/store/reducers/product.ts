/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-09 17:26:39
 * @LastEditTime: 2020-09-09 17:39:19
 * @FilePath: /koala-frontend/src/store/reducers/product.ts
 */

import { IOrderConfirmDefaultParams } from 'src/pages/OrderConfirm/interface';
import { IReduxAction } from 'src/interface/global';
import { UPDATE_ORDER_CONFIRM_PARAMS } from '../constants';

/**
 * 下单页面默认参数
 * @param state
 * @param actions
 */
export const orderConfirmDefaultParams = (
  state: IOrderConfirmDefaultParams = {
    productId: '',
    productAmount: 0,
    buyQuantity: 1,
    selectProductConfigList: undefined,
  },
  actions: IReduxAction<IOrderConfirmDefaultParams>,
): IOrderConfirmDefaultParams => {
  switch (actions.type) {
    case UPDATE_ORDER_CONFIRM_PARAMS:
      return actions.data;
    default:
      return state;
  }
};
