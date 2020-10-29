/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-23 15:03:15
 * @LastEditTime: 2020-10-29 15:19:53
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
import { ICommentPageData } from 'src/pages/CommentPage/interface';
import {
  UPDATE_COMMENT_PAGE_DATA,
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

/**
 * 评价页面信息
 * @param data
 * @param actions
 */
export const commentPageData = (
  data: ICommentPageData = { productList: [] },
  actions: IReduxAction<ICommentPageData>,
): ICommentPageData => {
  switch (actions.type) {
    case UPDATE_COMMENT_PAGE_DATA:
      return actions.data;
    default:
      return data;
  }
};
