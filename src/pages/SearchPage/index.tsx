import Taro, { Config, useState, useEffect } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import SearchInput from "../../components/SearchInput";
import { AtTag, AtButton } from "taro-ui";
import "./index.sass";
import { ESearchHistoryRecordLocalKey } from "../../enums/EProduct";

const SearchPage: { config: Config } = () => {
  const [searchHistoryRecordList, setSearchHistoryRecordList] = useState<
    Array<string>
  >([]);

  /**
   * 搜索组件确认搜索
   * @param value
   */
  const searchConfirm = value => {
    goToProductList(value);
  };

  /**
   * 点击历史记录tag
   * @param value
   */
  const historyRecordItemClick = value => {
    goToProductList(value);
  };

  /**
   * 清除搜索历史记录
   */
  const clearSearchHistoryRecord = () => {
    Taro.removeStorageSync(ESearchHistoryRecordLocalKey.SEARCH_HISTORY_RECORD);
    setSearchHistoryRecordList(_getLocalSearchHistoryRecord());
  };

  /**
   * 跳转产品列表页面
   * @param searchValue
   */
  const goToProductList = (searchValue: string) => {
    // TODO  跳转产品列表页面(redirect),并且把搜索参数带过去进行请求数据
    console.log(searchValue);
  };

  /**
   * 获取缓存中的搜索记录
   */
  const _getLocalSearchHistoryRecord = (): Array<string> => {
    return (
      Taro.getStorageSync(ESearchHistoryRecordLocalKey.SEARCH_HISTORY_RECORD) ||
      []
    ).reverse();
  };

  useEffect(() => {
    setSearchHistoryRecordList(_getLocalSearchHistoryRecord());
  }, []);

  return (
    <View className="search-page-wrapper">
      {/* 搜索组件 */}
      <SearchInput searchConfirm={searchConfirm} />
      {/* 历史记录 */}
      <View className="search-history-record">
        <View className="search-history-record-title">
          <Text className="title">历史记录</Text>
          {!!searchHistoryRecordList.length && (
            <AtButton
              size="small"
              onClick={clearSearchHistoryRecord}
              type="primary"
            >
              清除
            </AtButton>
          )}
        </View>
        {searchHistoryRecordList.map(item => (
          <AtTag
            className="search-history-record-item"
            key={item}
            type="primaray"
            size="small"
            active
            circle
            onClick={() => historyRecordItemClick(item)}
          >
            {item}
          </AtTag>
        ))}
      </View>
    </View>
  );
};

SearchPage.config = {
  navigationBarTitleText: "搜索商品"
};

export default SearchPage;
