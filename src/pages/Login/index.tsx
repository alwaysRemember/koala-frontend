import Taro, {
  Config,
  getSystemInfoSync,
  pxTransform,
  login,
} from "@tarojs/taro";
import React, { useState, useEffect } from "react";
import { AtButton } from "taro-ui";
import { View, Text, Image } from "@tarojs/components";
import logo from "../../images/global/logo.png";
import styles from "./index.module.scss";
import { ButtonProps } from "@tarojs/components/types/Button";
import { BaseEventOrig } from "@tarojs/components/types/common";
import { userLogin, updateUserPhone } from "../../api";
import { IUserLoginParams } from "./interface";
import { useDispatch, useMappedState } from "redux-react-hook";
import { updateUserInfo } from "../../store/actions";
import { showToast } from "../../utils/wxUtils";
import { IReducers } from "src/store/reducers/interface";
import { appletHomePath } from "../../router";

const TITLE_HEI: number = 44; // 标题高度

const Login = () => {
  const [barHei, setBarHei] = useState<number>(0); // 顶部高度
  const [isNext, setIsNext] = useState<boolean>(false); // 是否进行下一步操作

  const dispatch = useDispatch();

  const { userInfo } = useMappedState<IReducers>((state) => state);

  /**
   * 获取用户信息
   * @param event
   */
  const getUserInfo = async (
    event: BaseEventOrig<ButtonProps.onGetUserInfoEventDetail>
  ) => {
    const {
      detail: { userInfo, errMsg },
    } = event;
    console.log(errMsg);

    // 判断是否同意授权
    if (errMsg !== "getUserInfo:ok") {
      showToast({
        title: "您拒绝了授权！",
      });
      return;
    }
    try {
      // 调取登录获取code
      const { code }: { code: string; errMsg: string } = await login();
      const data = await userLogin(
        Object.assign({}, userInfo, { code }) as IUserLoginParams
      );
      // 存储到redux
      dispatch(updateUserInfo(data));

      // 如果手机号存在则证明非首次登陆直接跳转首页
      if (!data.phone) {
        setIsNext(true);
        return;
      }
      await showToast({
        title: "登录成功",
      });
      Taro.switchTab({
        url: appletHomePath(),
      });
    } catch (e) {}
  };

  /**
   * 获取用户手机号
   * @param param0
   */
  const getPhoneNumber = async ({
    detail: { errMsg, iv, encryptedData },
  }: {
    detail: ButtonProps.onGetPhoneNumberEventDetail;
  }) => {
    if (errMsg !== "getPhoneNumber:ok") {
      showToast({
        title: "获取手机号失败，请稍后重试",
      });
      return;
    }

    try {
      const { phone } = await updateUserPhone({
        iv,
        encryptedData,
      });
      // 更新redux
      dispatch(
        updateUserInfo(
          Object.assign({}, userInfo, {
            phone,
          })
        )
      );
      await showToast({
        title: "登录成功",
      });
      Taro.switchTab({
        url: "/pages/Home/index",
      });
    } catch (e) {}
  };

  useEffect(() => {
    // 设置状态栏高度
    const { statusBarHeight, pixelRatio } = getSystemInfoSync();
    setBarHei(statusBarHeight + TITLE_HEI * pixelRatio);
  }, []);
  return (
    <View
      className={styles["login-wrapper"]}
      style={{
        paddingTop: pxTransform(barHei),
      }}
    >
      <View className={styles["login-con"]}>
        <Image src={logo} className={styles["logo"]} mode="aspectFit" />
        <Text className={styles["login-msg"]}>
          您好，使用小程序需要授权微信登录以及手机号!
        </Text>
        {isNext ? (
          <AtButton
            type="primary"
            className={styles["login"]}
            openType="getPhoneNumber"
            onGetPhoneNumber={getPhoneNumber}
          >
            获取手机号
          </AtButton>
        ) : (
          <AtButton
            type="primary"
            className={styles["login"]}
            openType="getUserInfo"
            onGetUserInfo={getUserInfo}
          >
            登录
          </AtButton>
        )}
      </View>
    </View>
  );
};
export default Login;
