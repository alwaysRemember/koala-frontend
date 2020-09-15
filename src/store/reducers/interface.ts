import { IAddressItem } from '../../pages/AddressList/interface';
import { IFrontUserLoginResponse } from '../../pages/Login/interface';
import { IOrderConfirmDefaultParams } from '../../pages/OrderConfirm/interface';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 16:37:48
 * @LastEditTime: 2020-09-15 15:07:40
 * @FilePath: /koala-frontend/src/store/reducers/interface.ts
 */

export interface IReducers {
  userInfo: IFrontUserLoginResponse;
  orderConfirmDefaultParams: IOrderConfirmDefaultParams;
  shoppingAddress: IAddressItem | null;
}
