/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 15:37:02
 * @LastEditTime: 2020-08-05 15:51:24
 * @FilePath: /koala-frontend/src/store/reducers/user.ts
 */
import Taro from "@tarojs/taro";
import { IFrontUserLoginResponse } from "src/pages/Login/interface";
import { IReduxAction } from "src/interface/global";
import { UPDATE_USER_INFO } from "../constants";
import {
  EUserStorage,
  EUserGender,
  EUserLanguage
} from "../../enums/EUserGlobal";

// 从缓存中获取用户信息存储状态
const localUserInfo: string = Taro.getStorageSync(EUserStorage.LOCAL_USER_INFO);

/**
 * 用户信息
 * @param state
 * @param actions
 */
export const userInfo = (
  state: IFrontUserLoginResponse = Boolean(localUserInfo)
    ? JSON.parse(localUserInfo)
    : {
        openid: "",
        sessionKey: "",
        nickName: "",
        avatarUrl: "",
        gender: EUserGender.UNKONWN,
        country: "",
        province: "",
        city: "",
        language: EUserLanguage.ZH_CN
      },
  actions: IReduxAction<IFrontUserLoginResponse>
): IFrontUserLoginResponse => {
  switch (actions.type) {
    case UPDATE_USER_INFO:
      return actions.data;
    default:
      return state;
  }
};
