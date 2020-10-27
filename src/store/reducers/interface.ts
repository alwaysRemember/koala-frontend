import { IRefundCourierInfoData } from 'src/components/RefundCourierInfoModal/interface';
import { IReturnOfGoodsModalData } from 'src/components/ReturnOfGoodsModal/interface';
import { IAddressItem } from '../../pages/AddressList/interface';
import { IFrontUserLoginResponse } from '../../pages/Login/interface';
import { IOrderConfirmDefaultParams } from '../../pages/OrderConfirm/interface';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 16:37:48
 * @LastEditTime: 2020-10-27 15:14:19
 * @FilePath: /koala-frontend/src/store/reducers/interface.ts
 */

export interface IReducers {
  userInfo: IFrontUserLoginResponse;
  shoppingAddress: IAddressItem | null;
  orderConfirmProductList: Array<IOrderConfirmDefaultParams>;
  returnOfGoodsModalData: IReturnOfGoodsModalData;
  refundCourierInfoModalData: IRefundCourierInfoData;
}
