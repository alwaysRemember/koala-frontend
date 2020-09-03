/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 17:13:28
 * @LastEditTime: 2020-09-03 18:17:59
 * @FilePath: /koala-frontend/src/pages/Global/index.tsx
 */

import { AtActivityIndicator } from "taro-ui";
import React,{useEffect} from "react";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { showToast } from "../../utils/wxUtils";
import { appletHomePath, loginPath } from "../../router";

const Global = () => {
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      // 校验session是否过期
      await Taro.checkSession();
      Taro.switchTab({
        url: appletHomePath()
      });
    } catch (e) {
      await showToast({
        title: "请登录"
      });
      Taro.redirectTo({
        url: loginPath()
      });
    }
  };

  return (
    <View
      style={{
        position: "relative",
        minHeight: "100%"
      }}
    >
      <AtActivityIndicator size={56} mode="center" content="加载中..." />
    </View>
  );
};
Global.config = {
  navigationBarTitleText: "KOALA"
};

export default Global;
