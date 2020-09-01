import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";
import { AtIcon } from 'taro-ui'
const BottomOperatingArea = () => {
  return <View className="operating-area-wrapper">
      <View className="operating-area-con">
      <AtIcon prefixClass='icon' value='shoucang' size='30' color='#F00'></AtIcon>
      </View>
  </View>;
};
export default BottomOperatingArea;
