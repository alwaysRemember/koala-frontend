/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-11 11:34:50
 * @LastEditTime: 2020-09-17 16:04:46
 * @FilePath: /koala-frontend/src/pages/AddShoppingAddress/enums.ts
 */
// 页面类型
export enum EPageType {
  UPDATE = 'UPDATE', // 修改地址
  ADD = 'ADD', // 新增地址
}

// 页面来源
export enum EPageSource {
  'ORDER_CONFIRM' = 'ORDER_CONFIRM',
  'ADDRESS_LIST' = 'ADDRESS_LIST',
}
