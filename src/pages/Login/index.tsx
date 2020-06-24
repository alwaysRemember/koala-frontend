import Taro, {
  Config,
  getSystemInfoSync,
  useState,
  useEffect,
  pxTransform,
  login
} from "@tarojs/taro";
import { AtButton } from "taro-ui";
import { View, Text, Image } from "@tarojs/components";
import logo from "../../images/global/logo.png";
import "./index.sass";
import { ButtonProps } from "@tarojs/components/types/Button";
import { BaseEventOrig } from "@tarojs/components/types/common";
import { userLogin } from "../../api";
import { IUserLoginParams } from "./interface";
import { useDispatch } from "@tarojs/redux";
import { updateUserInfo } from "../../store/actions";
import { showToast } from "../../utils/wxUtils";

const TITLE_HEI: number = 44; // 标题高度

const Login: { config: Config } = () => {
  const [barHei, setBarHei] = useState<number>(0); // 顶部高度

  const dispatch = useDispatch();

  const getUserInfo = async (
    event: BaseEventOrig<ButtonProps.onGetUserInfoEventDetail>
  ) => {
    const {
      detail: { userInfo, errMsg }
    } = event;

    // 判断是否同意授权
    if (errMsg !== "getUserInfo:ok") {
      showToast({
        title: "您拒绝了授权！"
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

      await showToast({
        title: "登录成功"
      });
      Taro.switchTab({
        url: "/pages/Home/index"
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
