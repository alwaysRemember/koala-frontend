/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-11-17 14:10:37
 * @LastEditTime: 2020-11-26 15:14:20
 * @FilePath: /koala-frontend/src/pages/ProductList/interface.ts
 */

import { EProductSortType } from './enums';

export interface IProductListPathParams
  extends Partial<Record<string, string>> {
  categoriesId?: string; // 查询分类的ID
  searchName: string; // 查询的商品名称
}

export interface IProductListRequestParams {
  categoriesId?: string; // 查询分类的ID
  searchName: string; // 查询的商品名称
  productSortType: EProductSortType;
  page: number;
}

export interface IProductListResponseData {
  total: number;
  list: Array<IProductListItem>;
}

export interface IProductListItem {
  productId: string;
  amount: string;
  imgPath: string;
  name: string;
  productSales: number; // 销量
  productDeliveryCity: string; // 发货地
}
