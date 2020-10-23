import { MutableRefObject } from 'react';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-23 14:34:11
 * @LastEditTime: 2020-10-23 16:31:47
 * @FilePath: /koala-frontend/src/components/ReturnOfGoodsModal/interface.ts
 */
export interface IReturnOfGoodsModalDefaultData {
  amount: number;
  confirm: (reason: string) => void;
}
export interface IReturnOfGoodsModalData
  extends IReturnOfGoodsModalDefaultData {
  showType: boolean;
}
