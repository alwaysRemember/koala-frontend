import Taro from "@tarojs/taro";
import { AtButton } from "taro-ui";
import { View, Text } from "@tarojs/components";
import "./index.less";
const Home = () => {
  return (
    <View>
      <Text className={"text"}>Home</Text>
      <AtButton
        type="primary"
        size="small"
        onClick={() => {
          Taro.redirectTo({
            url: "/pages/Login/index"
          });
        }}
      >
        按钮
      </AtButton>
    </View>
  );
};

Home.config = {
  navigationBarTitleText: "主页"
};

export default Home;
