import Taro, { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";

const ProductDetail = () => {
  const {
    params: { productId }
  } = useRouter();
  console.log("productId", productId);

  return <View>productDetail</View>;
};

export default ProductDetail;
