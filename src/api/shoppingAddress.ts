/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-14 15:11:13
 * @LastEditTime: 2020-09-17 15:19:35
 * @FilePath: /koala-frontend/src/api/shoppingAddress.ts
 */
import { IAddressItem } from 'src/pages/AddressList/interface';
import { IAddShoppingAddressParams } from 'src/pages/AddShoppingAddress/interface';
import { IGetDefaultShoppingAddressResponse } from 'src/pages/OrderConfirm/interface';
import { request } from '../request';

const BASE = '/shoppingAddress';
/**
 * 新增收货地址
 * @param params
 */
export const addShoppingAddress = (params: IAddShoppingAddressParams) =>
  request<IAddressItem>({
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

/**
 * 获取默认收货地址
 */
export const getDefaultShoppingAddress = () =>
  request<IGetDefaultShoppingAddressResponse>({
    url: `${BASE}/get-default-shopping-address`,
    method: 'GET',
  });
