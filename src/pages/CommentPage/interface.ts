/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-29 14:07:24
 * @LastEditTime: 2020-10-29 16:45:55
 * @FilePath: /koala-frontend/src/pages/CommentPage/interface.ts
 */

import { IProductItem } from '../OrderList/interface';

export interface ICommentPagePathParams
  extends Partial<Record<string, string>> {
  orderId: string;
}

export interface ICommentPageData {
  productList: Array<IProductItem>;
}

export interface IProductCommentRequestData {
  orderId: string;
  productList: Array<ICommentProductItem>;
}

export interface ICommentItem extends IProductItem {
  rate: number;
  text: string;
}

export interface ICommentProductItem {
  productId: string;
  rate: number;
  text: string;
}
