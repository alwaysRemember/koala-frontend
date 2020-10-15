/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-15 14:15:52
 * @LastEditTime: 2020-10-15 14:16:04
 * @FilePath: /koala-frontend/src/enums/EOrder.ts
 */
export enum EOrderType {
  PENDING_PAYMENT = 'PENDING_PAYMENT', // 待付款
  TO_BE_DELIVERED = 'TO_BE_DELIVERED', // 待发货
  TO_BE_RECEIVED = 'TO_BE_RECEIVED', // 待收货
  REFUNDING = 'REFUNDING', // 退款中
  COMMENT = 'COMMENT', // 待评价
  FINISHED = 'FINISHED', // 已完结
  CANCEL = 'CANCEL', // 已取消
}
