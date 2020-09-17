import { IAddressItem } from '../../pages/AddressList/interface';
import { IFrontUserLoginResponse } from '../../pages/Login/interface';
import { IOrderConfirmDefaultParams } from '../../pages/OrderConfirm/interface';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 16:37:48
 * @LastEditTime: 2020-09-15 17:57:14
 * @FilePath: /koala-frontend/src/store/reducers/interface.ts
 */

export interface IReducers {
  userInfo: IFrontUserLoginResponse;
  shoppingAddress: IAddressItem | null;
  orderConfirmProductList: Array<IOrderConfirmDefaultParams>;
}
