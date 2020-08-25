/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-14 17:02:13
 * @LastEditTime: 2020-08-20 14:07:19
 * @FilePath: /koala-frontend/src/enums/EProduct.ts
 */

/**
 * 搜索历史记录在缓存中的key
 */
export enum ESearchHistoryRecordLocalKey {
  SEARCH_HISTORY_RECORD = "SEARCH_HISTORY_RECORD"
}

/**
 * 产品状态
 */
export enum EProductStatus {
  OFF_SHELF = "OFF_SHELF", // 下架
  UNDER_REVIEW = "UNDER_REVIEW", // 审核中
  PUT_ON_SHELF = "PUT_ON_SHELF" // 上架
}
