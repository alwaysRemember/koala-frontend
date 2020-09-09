import { IFrontUserLoginResponse } from 'src/pages/Login/interface';
import { IOrderConfirmDefaultParams } from 'src/pages/OrderConfirm/interface';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 16:37:48
 * @LastEditTime: 2020-09-09 17:33:15
 * @FilePath: /koala-frontend/src/store/reducers/interface.ts
 */

export interface IReducers {
  userInfo: IFrontUserLoginResponse;
  orderConfirmDefaultParams: IOrderConfirmDefaultParams;
}
