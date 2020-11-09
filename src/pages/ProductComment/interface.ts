/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-11-06 15:16:22
 * @LastEditTime: 2020-11-09 14:39:29
 * @FilePath: /koala-frontend/src/pages/ProductComment/interface.ts
 */

export interface IProductCommentPathParams
  extends Partial<Record<string, string>> {
  productId: string;
}

export interface IProductCommentResponseData {
  list: Array<IProductCommentItem>;
}
export interface IProductCommentItem {
  text: string;
  rate: number;
  avatar: string;
  userName: string;
  createTime: string;
}
