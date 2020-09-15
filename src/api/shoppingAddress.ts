import { IAddressItem } from 'src/pages/AddressList/interface';
import { IAddShoppingAddressParams } from 'src/pages/AddShoppingAddress/interface';
import { request } from '../request';

const BASE = '/shoppingAddress';
/**
 * 新增收货地址
 * @param params
 */
export const addShoppingAddress = (params: IAddShoppingAddressParams) =>
  request({
    url: `${BASE}/add-shopping-address`,
    params,
    method: 'POST',
  });

/**
 * 获取收货地址列表
 */
export const getShoppingAddressList = () =>
  request<Array<IAddressItem>>({
    url: `${BASE}/get-shopping-address-list`,
    method: 'GET',
  });

/**
 * 删除收货地址
 * @param params
 */
export const deleteShoppingAddress = (params: { id: number }) =>
  request({
    url: `${BASE}/delete-shopping-address`,
    method: 'POST',
    params,
  });
