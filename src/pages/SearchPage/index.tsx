import React from 'react';
import Taro, { Config } from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import SearchInput from '../../components/SearchInput';
import { AtTag, AtButton } from 'taro-ui';
import styles from './index.module.scss';
import { ESearchHistoryRecordLocalKey } from '../../enums/EProduct';
import { productListPagePath } from '../../router';

const SearchPage: { config: Config } = () => {
  const [searchHistoryRecordList, setSearchHistoryRecordList] = useState<
    Array<string>
  >([]);

  /**
   * 搜索组件确认搜索
   * @param value
   */
  const searchConfirm = (value) => {
    goToProductList(value);
  };

  /**
   * 点击历史记录tag
   * @param value
   */
  const historyRecordItemClick = (value) => {
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
    Taro.redirectTo({
      url: productListPagePath({
        searchName: searchValue,
      }),
    });
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
    <View className={styles['search-page-wrapper']}>
      {/* 搜索组件 */}
      <SearchInput searchConfirm={searchConfirm} />
      {/* 历史记录 */}
      <View className={styles['search-history-record']}>
        <View className={styles['search-history-record-title']}>
          <Text className={styles['title']}>历史记录</Text>
          {!!searchHistoryRecordList.length && (
            <AtButton
              size="small"
              onClick={clearSearchHistoryRecord}
              type="primary"
              className={styles['clear']}
            >
              清除
            </AtButton>
          )}
        </View>
        {searchHistoryRecordList.map((item) => (
          <AtTag
            className={styles['search-history-record-item']}
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
  navigationBarTitleText: '搜索商品',
};

export default SearchPage;
