import Taro, { useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";
import { AtIcon } from "taro-ui";
import { IBottomOperatingArea } from "./interface";


const BottomOperatingArea = ({ favorites = false }: IBottomOperatingArea) => {
  return (
    <View className="operating-area-wrapper">
      <View className="operating-area-con">
        <View className="operating-area-item">
          <AtIcon prefixClass="icon" className="icon" value="kefu" />
          <Text className="label">客服</Text>
        </View>
        <View className="operating-area-item">
          <AtIcon
            prefixClass="icon"
            className="iconfont icon"
            value="shoucang1"
            color={`${favorites ? "#e93b3d" : ""}`}
          />
          <Text className="label">收藏</Text>
        </View>
        <View className="operating-area-item btn">
          <Text className="label">加入购物车</Text>
        </View>
        <View className="operating-area-item btn">
          <Text className="label">立即购买</Text>
        </View>
      </View>
    </View>
  );
};
export default BottomOperatingArea;
