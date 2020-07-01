import Taro, { useState, useEffect, usePullDownRefresh } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import Banner from "./components/Banner";
import Classification from "./components/Classification";
import "./index.sass";
import { IHomeData } from "./interface";
import Featured from "./components/Featured";
import HomeSkeleton from "./components/HomeSkeleton";
import { getHomeInfo } from "../../api";

const testImg =
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593508914657&di=d9a9d65d06873fd71d634976e0cbcbe2&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D2247852322%2C986532796%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853";
const Home = () => {
  const [showPage, setShowPage] = useState<boolean>(false);
  const [data, setData] = useState<IHomeData>({
    bannerList: [],
    showClassificationMore: true,
    classificationList: [],
    featuredList: []
  });

  const getData = async (isPullDownRefresh: boolean = false) => {
    try {
      const data = await getHomeInfo();
      setData(data);
      setShowPage(true);
    } catch (e) {}
    isPullDownRefresh && Taro.stopPullDownRefresh();
  };

  useEffect(() => {
    getData();
  }, []);

  usePullDownRefresh(() => {
    getData(true);
  });
  return (
    <View>
      {showPage ? (
        <View className="home-wrapper">
          {/* 搜索 */}
          {/* TODO 点击搜索 */}
          <View className="search">
            <View className="at-icon at-icon-search search-icon" />
            <Text className="text">点击搜索喜爱的商品</Text>
          </View>
          {/* banner */}
          <Banner bannerList={data.bannerList} />
          {/* 分类 */}
          <Classification
            showClassificationMore={data.showClassificationMore}
            classificationList={data.classificationList}
          />
          {/* 精选推荐 */}
          <Featured featuredList={data.featuredList} />
        </View>
      ) : (
        <HomeSkeleton />
      )}
    </View>
  );
};

Home.config = {
  navigationBarTitleText: "主页",
  navigationBarBackgroundColor: "#e93b3d",
  navigationBarTextStyle: "white",
  enablePullDownRefresh:true
};

export default Home;
