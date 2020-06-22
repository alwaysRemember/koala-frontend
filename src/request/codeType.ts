/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-22 19:12:22
 * @LastEditTime: 2020-06-22 19:24:51
 * @FilePath: /koala-frontend/src/request/codeType.ts
 */
import Taro from "@tarojs/taro";
import { EResponseCode } from "./enum";

/**
 * 状态码校验
 */
export default (code: EResponseCode, message: string): Promise<any> => {
  return new Promise((res, rej) => {
    switch (code) {
      case EResponseCode.OK:
        res();
        break;
      case EResponseCode.ALERT:
        Taro.showToast({
          title: message,
          icon: "none"
        });
        rej();
        break;
    }
  });
};
