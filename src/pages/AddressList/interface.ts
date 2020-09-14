import { IAddShoppingAddressParams } from '../AddShoppingAddress/interface';
/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-10 15:31:58
 * @LastEditTime: 2020-09-14 18:20:56
 * @FilePath: /koala-frontend/src/pages/AddressList/interface.ts
 */

import { EAddressListPathSource } from './enums';

export interface IAddressListPathParams
  extends Partial<Record<string, string>> {
  source?: EAddressListPathSource;
}

export interface IAddressItem extends IAddShoppingAddressParams {
  id: number;
  createTime: Date;
  updateTime: Date;
}
