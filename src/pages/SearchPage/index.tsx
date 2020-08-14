import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import SearchInput from "../../components/SearchInput";

const SearchPage: { config: Config } = () => {
  return (
    <View>
      <SearchInput />
    </View>
  );
};

SearchPage.config = {
  navigationBarTitleText: "搜索商品"
};

export default SearchPage;
