import Taro, { useRouter, useState, useEffect } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { IProductDetailResponse } from "./interface";
import { EProductStatus } from "../../enums/EProduct";
import { getProductDetail } from "../../api/product";
import { showToast } from "../../utils/wxUtils";
import Banner from "./components/Banner";

const ProductDetail = () => {
  let {
    params: { productId }
  } = useRouter();
  productId = "9d3e5e9a-dc99-47ce-8520-63c4c937b44d";
  const [data, setData] = useState<IProductDetailResponse>({
    productId: "",
    productVideo: {
      id: "",
      url: ""
    },
    productBanner: [],
    productAmount: 0,
    productName: "",
    productStatus: EProductStatus.PUT_ON_SHELF,
    productType: true, // 是否为7天无理由退款商品
    productBrief: "", // 产品简介
    productContent: "", // 产品内容介绍
    productParameter: [], // 产品参数
    productConfigList: [],
    productDeliveryCity: "", // 发货地点
    productSales: 0 // 产品销量
  });

  const getData = async () => {
    try {
      const data = await getProductDetail({ productId });
      setData(data);
    } catch (e) {}
  };

  useEffect(() => {
    (productId && getData()) ||
      showToast({
        title: "产品ID为空"
      });
  }, [productId]);

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: data.productName
    });
  }, [data]);
  return (
    <View className="detail-wrapper">
      <Banner video={data.productVideo} bannerList={data.productBanner} />
    </View>
  );
};

export default ProductDetail;
