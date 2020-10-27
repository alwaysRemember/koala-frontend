/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-27 14:51:38
 * @LastEditTime: 2020-10-27 16:39:21
 * @FilePath: /koala-frontend/src/components/RefundCourierInfoModal/interface.ts
 */

import { IRefundCOurierConfirmParams } from '../OrderOperationBtn/interface';

export interface IRefundCourierInfoDefaultData {
  confirm: ((params: IRefundCOurierConfirmParams) => void) | undefined;
}

export interface IRefundCourierInfoData extends IRefundCourierInfoDefaultData {
  showType: boolean;
}
