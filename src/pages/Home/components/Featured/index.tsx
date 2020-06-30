import Taro from "@tarojs/taro";
import { AtButton } from "taro-ui";
import { View, Text, Image } from "@tarojs/components";
import "./index.sass";
import { IFeaturedItem } from "../../interface";

const Featured = ({ featuredList }: { featuredList: Array<IFeaturedItem> }) => {
  return (
    <View className="featured-wrapper">
      <Text className="featured-title">精选推荐</Text>
      {featuredList &&
        featuredList.map((item: IFeaturedItem) => (
          <View className="featured-product-item" key={item.id}>
            <Image src={item.logo} lazyLoad={true} className="logo" />
            <View className="featured-product-info">
              <Text className="prodcut-name">{item.name}</Text>
              <Text className="product-introduction">{item.introduction}</Text>
              <View className="product-amount-wrapper">
                <View className="product-amount">
                  <Text className="amount-label">限时价 </Text>
                  <Text className="amount">¥{item.amount / 100}</Text>
                </View>
                <AtButton type="primary" size="small" circle>
                  立即抢购
                </AtButton>
              </View>
            </View>
          </View>
        ))}
    </View>
  );
};

export default Featured;
