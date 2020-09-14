import { IAddShoppingAddressParams } from 'src/pages/AddShoppingAddress/interface';
import { request } from '../request';

/**
 * 新增收货地址
 * @param params
 */
export const addShoppingAddress = (params: IAddShoppingAddressParams) =>
  request({
    url: '/shoppingAddress/add-shopping-address',
    params,
    method: 'POST',
  });
