/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-23 15:46:07
 * @LastEditTime: 2020-06-24 15:59:22
 * @FilePath: /koala-frontend/src/enums/EUserGlobal.ts
 */

// 用户性别
export enum EUserGender {
  UNKONWN = 0, // 未知
  MAN = 1, // 男性
  WOMAN = 2 // 女性
}

// 用户所用语言
export enum EUserLanguage {
  EN = "en", // 英文
  ZH_CN = "zh_CN", // 简体中文
  ZH_TW = "zh_TW" // 繁体中文
}

// 用户缓存key
export enum EUserStorage {
  LOCAL_USER_INFO = "LOCAL_USER_INFO"
}
