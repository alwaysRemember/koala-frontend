import { IRefundCourierInfoDefaultData } from 'src/components/RefundCourierInfoModal/interface';
import { IReturnOfGoodsModalDefaultData } from 'src/components/ReturnOfGoodsModal/interface';
import { IReduxAction } from 'src/interface/global';
import { ICommentPageData } from 'src/pages/CommentPage/interface';
import {
  UPDATE_COMMENT_PAGE_DATA,
  UPDATE_REFUND_COURIER_INFO_MODAL_INFO,
  UPDATE_REFUND_COURIER_INFO_MODAL_TYPE,
  UPDATE_RETURN_OF_GOODS_MODAL_INFO,
  UPDATE_RETURN_OF_GOODS_MODAL_TYPE,
} from '../constants';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-23 15:02:11
 * @LastEditTime: 2020-10-29 15:18:02
 * @FilePath: /koala-frontend/src/store/actions/order.ts
 */

/**
 * 更新退款modal显示状态
 * @param data
 */
export const updateReturnOfGoodsModalType = (
  data: boolean,
): IReduxAction<boolean> => ({
  type: UPDATE_RETURN_OF_GOODS_MODAL_TYPE,
  data,
});

/**
 * 更新退款信息
 * @param data
 */
export const updateReturnOfGoodsModalInfo = (
  data: IReturnOfGoodsModalDefaultData,
): IReduxAction<IReturnOfGoodsModalDefaultData> => ({
  type: UPDATE_RETURN_OF_GOODS_MODAL_INFO,
  data,
});

/**
 * 更新退货信息modal显示状态
 * @param data
 */
export const updateRefundCourierInfoModalType = (
  data: boolean,
): IReduxAction<boolean> => ({
  type: UPDATE_REFUND_COURIER_INFO_MODAL_TYPE,
  data,
});

/**
 * 更新退货信息modal中的所需参数
 * @param data
 */
export const updateRefundCourierInfoModalInfo = (
  data: IRefundCourierInfoDefaultData,
): IReduxAction<IRefundCourierInfoDefaultData> => ({
  type: UPDATE_REFUND_COURIER_INFO_MODAL_INFO,
  data,
});

/**
 * 更新评价页面数据
 * @param data
 */
export const updateCommentPageData = (
  data: ICommentPageData,
): IReduxAction<ICommentPageData> => ({
  type: UPDATE_COMMENT_PAGE_DATA,
  data,
});
