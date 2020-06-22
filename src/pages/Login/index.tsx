import Taro, {
  Config,
  getSystemInfoSync,
  useState,
  useEffect,
  pxTransform,
  login,
  showToast
} from "@tarojs/taro";
import { AtButton } from "taro-ui";
import { View, Text, Image } from "@tarojs/components";
import logo from "../../images/global/logo.png";
import "./index.sass";
import { ButtonProps } from "@tarojs/components/types/Button";
import { BaseEventOrig } from "@tarojs/components/types/common";
import { userLogin } from "../../api";

const TITLE_HEI: number = 44; // 标题高度

const Login: { config: Config } = () => {
  const [barHei, setBarHei] = useState<number>(0); // 顶部高度

  const getUserInfo = async (
    event: BaseEventOrig<ButtonProps.onGetUserInfoEventDetail>
  ) => {
    const {
      detail: { userInfo, errMsg }
    } = event;

    // 判断是否同意授权
    if (errMsg !== "getUserInfo:ok") {
      Taro.showToast({
        title: "您拒绝了授权！",
        icon: "none"
      });
      return;
    }

    try {
      // 调取登录获取code
      const { code }: { code: string; errMsg: string } = await login();
      await userLogin();
      // TODO 把code和userInfo传递给后端存储，并且换到openId 和sessiond_key 进行存储
    } catch (e) {}
  };

  useEffect(() => {
    // 设置状态栏高度
    const { statusBarHeight, pixelRatio } = getSystemInfoSync();
    setBarHei(statusBarHeight + TITLE_HEI * pixelRatio);
  }, []);
  return (
    <View
      className="login-wrapper"
      style={{
        paddingTop: pxTransform(barHei)
      }}
    >
      <View className="login-con">
        <Image src={logo} className="logo" mode="aspectFit" />
        <Text className="login-msg">您好，使用小程序需要授权登录!</Text>
        <AtButton
          type="primary"
          className="login"
          openType="getUserInfo"
          onGetUserInfo={getUserInfo}
        >
          登录
        </AtButton>
      </View>
    </View>
  );
};
Login.config = {
  navigationBarTitleText: "登录",
  navigationStyle: "custom"
};
export default Login;
