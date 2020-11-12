/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-11-10 16:32:59
 * @LastEditTime: 2020-11-12 15:05:27
 * @FilePath: /koala-frontend/src/pages/Favorites/interface.ts
 */

import { EProductStatus } from 'src/enums/EProduct';
import { IProductItem } from '../OrderList/interface';

export interface IGetFavoritesResponseData {
  total: number;
  list: Array<IFavoritesItem>;
}

export interface IFavoritesItem {
  favoritesId: number;
  productId: string;
  img: string;
  name: string;
  amount: number;
  productStatus: EProductStatus;
}
