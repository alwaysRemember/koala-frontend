/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-23 15:03:15
 * @LastEditTime: 2020-10-27 15:13:20
 * @FilePath: /koala-frontend/src/store/reducers/order.ts
 */

import {
  IRefundCourierInfoData,
  IRefundCourierInfoDefaultData,
} from 'src/components/RefundCourierInfoModal/interface';
import {
  IReturnOfGoodsModalData,
  IReturnOfGoodsModalDefaultData,
} from 'src/components/ReturnOfGoodsModal/interface';
import { IReduxAction } from 'src/interface/global';
import {
  UPDATE_REFUND_COURIER_INFO_MODAL_INFO,
  UPDATE_REFUND_COURIER_INFO_MODAL_TYPE,
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

/**
 * 退款物流信息
 * @param data
 * @param action
 */
export const refundCourierInfoModalData = (
  data: IRefundCourierInfoData,
  action: IReduxAction<boolean | IRefundCourierInfoDefaultData>,
): IRefundCourierInfoData => {
  switch (action.type) {
    case UPDATE_REFUND_COURIER_INFO_MODAL_TYPE:
      return { ...data, ...{ showType: action.data as boolean } };
    case UPDATE_REFUND_COURIER_INFO_MODAL_INFO:
      const { confirm } = action.data as IRefundCourierInfoDefaultData;
      return {
        ...data,
        ...{
          confirm,
        },
      };
    default:
      return { showType: false, confirm: undefined };
  }
};
