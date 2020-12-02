/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-11-27 16:34:50
 * @LastEditTime: 2020-12-01 14:23:34
 * @FilePath: /koala-frontend/src/api/shoppingCart.ts
 */

import { ISaveProductToShoppingCartRequestParams } from 'src/pages/ProductDetail/interface';
import {
  IDeleteProductForShoppingCartRequestParams,
  IShoppingCartRequestParams,
  IShoppingCartResponseData,
} from 'src/pages/ShoppingCart/interface';
import { request } from '../request';

const BASE = '/shopping-cart';

/**
 *添加商品至购物车
 * @param params
 */
export const saveProductToShoppingCart = (
  params: ISaveProductToShoppingCartRequestParams,
) =>
  request({
    url: `${BASE}/save-product-to-shopping-cart`,
    method: 'POST',
    params,
  });

/**
 * 删除购物车产品
 * @param params
 */
export const deleteProductForShoppingCart = (
  params: IDeleteProductForShoppingCartRequestParams,
) =>
  request({
    url: `${BASE}/delete-product-for-shopping-cart`,
    method: 'POST',
    params,
  });

/**
 *获取购物车商品列表
 * @param params
 */
export const getShoppingCartProductList = (
  params: IShoppingCartRequestParams,
  showLoading: boolean = true,
) =>
  request<IShoppingCartResponseData>({
    url: `${BASE}/get-shopping-cart-product-list`,
    method: 'POST',
    params,
    showLoading,
  });
