import { IReturnOfGoodsModalDefaultData } from 'src/components/ReturnOfGoodsModal/interface';
import { IReduxAction } from 'src/interface/global';
import {
  UPDATE_RETURN_OF_GOODS_MODAL_INFO,
  UPDATE_RETURN_OF_GOODS_MODAL_TYPE,
} from '../constants';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-23 15:02:11
 * @LastEditTime: 2020-10-23 15:16:08
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
