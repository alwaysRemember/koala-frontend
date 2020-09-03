import Taro, { useRouter, useState, useEffect } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { IProductDetailResponse, IProductConfig } from "./interface";
import { EProductStatus } from "../../enums/EProduct";
import { getProductDetail } from "../../api/product";
import { showToast } from "../../utils/wxUtils";
import Banner from "./components/Banner";
import "./index.scss";
import { transferAmount } from "../../utils";
import BottomOperatingArea from "./components/BottomOperatingArea/incex";
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
    productConfigList: [], // 产品配置
    productDeliveryCity: "", // 发货地点
    productSales: 0, // 产品销量
    productShipping: 0,
    productFavorites: false
  });

  const [productAmount, setProductAmount] = useState<string>("235.99"); // 显示在页面中的金额，可能为区间
  const [
    productConfigCategoriesList,
    setProductConfigCategoriesList
  ] = useState<Array<string>>([]); // 产品配置中的分类

  /* 提交参数 */
  const [productConfig, setProductConfig] = useState<undefined | number>(); // 可选参数，产品配置,当没有配置要选的时候为undefined

  const getData = async () => {
    try {
      const data = await getProductDetail({ productId });
      setData(data);
    } catch (e) {}
  };

  /**
   * 根据产品配置转换为产品金额
   * @param type  取最小值还是最大值
   */
  const _transferProductAmount = (type: "min" | "max"): string => {
    const { productConfigList, productAmount } = data;
    let currentData: IProductConfig = productConfigList[0];
    productConfigList.forEach(item => {
      const result: boolean =
        type === "min"
          ? item.amount < currentData.amount
          : item.amount > currentData.amount;
      if (result) currentData = item;
    });
    return transferAmount(currentData.amount + productAmount, "yuan") as string;
  };

  /**
   * 获取产品配置中的分类
   */
  const _getproductConfigCategoriesList = (): Array<string> => {
    const list: Array<string> = [];
    data.productConfigList.forEach(({ categoryName }) => {
      const result: string | undefined = list.find(
        value => value === categoryName
      );
      if (!result) list.push(categoryName);
    });
    return list;
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
    // 设置显示的产品金额
    const { productConfigList, productAmount } = data;

    // 设置显示的产品金额
    if (productConfigList.length) {
      setProductAmount(
        `${_transferProductAmount("min")}-${_transferProductAmount("max")}`
      );
    } else {
      setProductAmount(String(productAmount));
    }

    // 设置产品配置分类
    setProductConfigCategoriesList(_getproductConfigCategoriesList());
  }, [data]);
  return (
    <View className="detail-wrapper">
      {/* banner */}
      <Banner video={data.productVideo} bannerList={data.productBanner} />
      {/* 主要产品介绍 */}
      <View className="product-info">
        <Text className="product-amount">¥ {productAmount}</Text>
        <Text className="product-name">{data.productName}</Text>
        <View className="delivery-info">
          <Text className="delivery-info-item">
            <Text className="label">发货</Text> : {data.productDeliveryCity}
          </Text>
          <Text className="delivery-info-item">
            <Text className="label">快递费</Text> : ¥
            {transferAmount(data.productShipping, "yuan")}元
          </Text>
          <Text className="delivery-info-item">
            <Text className="label">销量</Text> : {data.productSales}
          </Text>
        </View>
        {/* 选择规格 */}
        {data.productConfigList.length && (
          <View className="select-product-config">
            <Text className="tips">
              请选择
              {productConfigCategoriesList.map((value, index) => (
                <Text key={index}> {value}</Text>
              ))}
            </Text>
            <View className="at-icon at-icon-chevron-right icon" />
          </View>
        )}
      </View>

      {/* 底部操作区 */}
      <BottomOperatingArea favorites={data.productFavorites} />
    </View>
  );
};

export default ProductDetail;
