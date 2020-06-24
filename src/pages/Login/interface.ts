/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-23 15:45:05
 * @LastEditTime: 2020-06-24 15:11:21
 * @FilePath: /koala-frontend/src/pages/Login/interface.ts
 */

import { EUserGender, EUserLanguage } from "src/enums/EUserGlobal";

export interface IUserLoginParams {
  code: string;
  nickName: string;
  avatarUrl: string;
  gender: EUserGender;
  country: string;
  province: string;
  city: string;
  language: EUserLanguage;
}

// 小程序用户登录返回字段
export interface IFrontUserLoginResponse {
  appid: string;
  sessionKey: string;
  nickName: string;
  avatarUrl: string;
  gender: EUserGender;
  country: string;
  province: string;
  city: string;
  language: EUserLanguage;
}
