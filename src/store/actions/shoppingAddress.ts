import { IReduxAction } from 'src/interface/global';
/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-15 14:04:44
 * @LastEditTime: 2020-09-15 14:12:35
 * @FilePath: /koala-frontend/src/store/actions/shoppingAddress.ts
 */

import { IAddressItem } from '../../pages/AddressList/interface';
import { SELECT_SHOPPING_ADDRESS } from '../constants';

/**
 * 选择收货地址
 * @param data
 */
export const selectShoppingAddress = (
  data: IAddressItem | null,
): IReduxAction<IAddressItem | null> => ({
  type: SELECT_SHOPPING_ADDRESS,
  data,
});
