import { View } from '@tarojs/components';
import React, { useState } from 'react';
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui';
import { EOrderType } from '../../enums/EOrder';
import styles from './index.module.scss';
import { ITabDataItem, TDeafultTabKey } from './interface';
const OrderList = () => {
  // tabs标签页数据
  const [tabData, setTabData] = useState<Array<ITabDataItem>>([
    {
      title: '全部',
      key: 'ALL',
      page: 1,
      list: [],
    },
    {
      title: '待付款',
      key: EOrderType.PENDING_PAYMENT,
      page: 1,
      list: [],
    },
    {
      title: '待发货',
      key: EOrderType.TO_BE_DELIVERED,
      page: 1,
      list: [],
    },
    {
      title: '待收货',
      key: EOrderType.TO_BE_RECEIVED,
      page: 1,
      list: [],
    },
    {
      title: '待评价',
      key: EOrderType.COMMENT,
      page: 1,
      list: [],
    },
  ]);
  const [currentTab, setCurrentTab] = useState<number>(0); // 当前tab

  // 搜索
  const [searchName, setSearchName] = useState<string>('');

  const searchProduct = () => {
    // 搜索功能需跳转到tab = 0 ，page = 1， 再进行搜索功能
  };
  return (
    <View className={styles['order-list-wrapper']}>
      <View className={styles['search-product-wrapper']}>
        <AtSearchBar
          placeholder="输入搜索的商品名称"
          value={searchName}
          fixed
          onChange={(value: string) => {
            setSearchName(value);
          }}
          onConfirm={searchProduct}
          onActionClick={searchProduct}
        />
      </View>
      <View className={styles['order-list-tabs-wrapper']}>
        <AtTabs
          current={currentTab}
          tabList={tabData.map(({ title }) => ({ title }))}
          onClick={(index: number) => {
            setCurrentTab(index);
          }}
        >
          {tabData.map((item, index) => (
            <AtTabsPane
              current={currentTab}
              index={index}
              className={styles['tab-page-wrapper']}
              key={item.key}
            >
              <View>
                {item.title} {item.key}
              </View>
            </AtTabsPane>
          ))}
        </AtTabs>
      </View>
    </View>
  );
};

export default OrderList;
