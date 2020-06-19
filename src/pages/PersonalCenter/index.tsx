import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

const PersonalCenter = () => {
  return (
    <View>
      <Text>personal center</Text>
    </View>
  );
};

PersonalCenter.config = {
  navigationBarTitleText: "个人中心"
};

export default PersonalCenter;
