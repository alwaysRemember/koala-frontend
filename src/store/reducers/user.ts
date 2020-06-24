/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 15:37:02
 * @LastEditTime: 2020-06-24 16:04:53
 * @FilePath: /koala-frontend/src/store/reducers/user.ts
 */
import Taro from "@tarojs/taro";
import { IFrontUserLoginResponse } from "src/pages/Login/interface";
import { IReduxAction } from "src/interface/global";
import { UPDATE_USER_INFO } from "../constants";
import { EUserStorage } from "../../enums/EUserGlobal";

// 从缓存中获取用户信息存储状态
const localUserInfo: string = Taro.getStorageSync(EUserStorage.LOCAL_USER_INFO);

/**
 * 用户信息
 * @param state
 * @param actions
 */
export const userInfo = (
  state: IFrontUserLoginResponse | null = Boolean(localUserInfo)
    ? JSON.parse(localUserInfo)
    : null,
  actions: IReduxAction<IFrontUserLoginResponse>
): IFrontUserLoginResponse | null => {
  switch (actions.type) {
    case UPDATE_USER_INFO:
      return actions.data;
    default:
      return state;
  }
};
