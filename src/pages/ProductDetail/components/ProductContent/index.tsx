import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

const ProductContent = ({ data }: { data: string }) => {
  console.log(data);
  
  return <View dangerouslySetInnerHTML={{ __html: data }} />
};

export default ProductContent;
