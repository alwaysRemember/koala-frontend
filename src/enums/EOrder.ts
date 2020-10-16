/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-15 14:15:52
 * @LastEditTime: 2020-10-16 16:53:59
 * @FilePath: /koala-frontend/src/enums/EOrder.ts
 */
export enum EOrderType {
  PENDING_PAYMENT = 'PENDING_PAYMENT', // 待付款
  TO_BE_DELIVERED = 'TO_BE_DELIVERED', // 待发货
  TO_BE_RECEIVED = 'TO_BE_RECEIVED', // 待收货
  REFUNDING = 'REFUNDING', // 退款中
  SUCCESS_RETURN = 'SUCCESS_RETURN', // 退款成功
  COMMENT = 'COMMENT', // 待评价
  FINISHED = 'FINISHED', // 已完结
  CANCEL = 'CANCEL', // 已取消
}

export enum EOrderTypeTransferVal {
  PENDING_PAYMENT = '待付款',
  TO_BE_DELIVERED = '待发货',
  TO_BE_RECEIVED = '待收货',
  REFUNDING = '退款中',
  SUCCESS_RETURN = '交易关闭',
  COMMENT = '待评价',
  FINISHED = '已完结',
  CANCEL = '已取消',
}
