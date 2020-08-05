/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-22 19:12:22
 * @LastEditTime: 2020-08-05 17:14:37
 * @FilePath: /koala-frontend/src/request/codeType.ts
 */
import Taro from "@tarojs/taro";
import { EResponseCode } from "./enum";
import { showToast } from "../utils/wxUtils";

/**
 * 状态码校验
 */
export default (code: EResponseCode, message: string): Promise<any> => {
  return new Promise(async (res, rej) => {
    switch (code) {
      case EResponseCode.OK:
        res();
        break;
      case EResponseCode.ALERT:
        rej({ message });
        break;
      case EResponseCode.NO_LOGIN:
        await showToast({
          title: "请登录"
        });
        Taro.redirectTo({
          url: "/pages/Login/index"
        });
        break;
    }
  });
};
