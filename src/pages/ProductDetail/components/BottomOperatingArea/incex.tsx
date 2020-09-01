import Taro from "@tarojs/taro";
import { View,Text } from "@tarojs/components";
import "./index.scss";
import { AtIcon } from 'taro-ui'
const BottomOperatingArea = () => {
  return <View className="operating-area-wrapper">
      <View className="operating-area-con">
        <View className="operating-area-item">
          <AtIcon prefixClass="icon" className="icon" value="kefu" />
          <Text className="label">客服</Text>
        </View>
        <View className="operating-area-item">
          <AtIcon prefixClass="icon" className="iconfont" value="shoucang" />
          <Text className="label">收藏</Text>
        </View>
        <View className="operating-area-item btn">
          <Text className="label">加入购物车</Text>
        </View>
        <View className="operating-area-item btn">
          <Text className="label">立即购买</Text>
        </View>
      </View>
  </View>;
};
export default BottomOperatingArea;
