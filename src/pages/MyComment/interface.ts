/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-11-13 14:22:36
 * @LastEditTime: 2020-11-16 15:12:45
 * @FilePath: /koala-frontend/src/pages/MyComment/interface.ts
 */

export interface IMyCommentResponseData {
  total: number;
  list: Array<ICommentItem>;
}

export interface ICommentItem {
  id: number;
  rate: number;
  text: string;
  avatar: string;
  userName: string;
  createTime: Date;
  product: ICommentProduct;
}

export interface ICommentProduct {
  productId: string;
  url: string;
}
