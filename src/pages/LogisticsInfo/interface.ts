/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-28 15:18:55
 * @LastEditTime: 2020-10-28 18:24:09
 * @FilePath: /koala-frontend/src/pages/LogisticsInfo/interface.ts
 */
export interface ILogisticsInfoPathParams
  extends Partial<Record<string, string>> {
  orderId: string;
}

export interface ILogisticsInfoResponseData {
  name: string;
  num: string;
  signStatus: string; // 签收状态
  expressData: Array<IExpressDataItem>;
}

export interface IExpressDataItem {
  context: string; // 快递当前信息
  time: string; // 格式化后的时间
}
