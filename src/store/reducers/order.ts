/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-23 15:03:15
 * @LastEditTime: 2020-10-23 16:31:32
 * @FilePath: /koala-frontend/src/store/reducers/order.ts
 */

import {
  IReturnOfGoodsModalData,
  IReturnOfGoodsModalDefaultData,
} from 'src/components/ReturnOfGoodsModal/interface';
import { IReduxAction } from 'src/interface/global';
import {
  UPDATE_RETURN_OF_GOODS_MODAL_INFO,
  UPDATE_RETURN_OF_GOODS_MODAL_TYPE,
} from '../constants';

/**
 * 退款modal信息
 * @param data
 * @param action
 */
export const returnOfGoodsModalData = (
  data: IReturnOfGoodsModalData,
  action: IReduxAction<boolean | IReturnOfGoodsModalDefaultData>,
): IReturnOfGoodsModalData => {
  switch (action.type) {
    case UPDATE_RETURN_OF_GOODS_MODAL_TYPE:
      return { ...data, ...{ showType: action.data as boolean } };
    case UPDATE_RETURN_OF_GOODS_MODAL_INFO:
      const { amount, confirm } = action.data as IReturnOfGoodsModalDefaultData;
      return {
        ...data,
        ...{
          amount,
          confirm,
        },
      };
    default:
      return {
        showType: false,
        amount: 0,
        confirm: (reason: string) => {},
      };
  }
};
