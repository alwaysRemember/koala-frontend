import { View } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { getOrderList } from '../../api';
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui';
import { EOrderType } from '../../enums/EOrder';
import styles from './index.module.scss';
import {
  ITabDataItem,
  EDeafultTabKey,
  IOrderListPathParams,
} from './interface';
import OrderItem from './components/OrderItem';
const OrderList = () => {
  const {
    params: { type = EDeafultTabKey.ALL },
  } = useRouter<IOrderListPathParams>();
  // tabs标签页数据
  const [tabData, setTabData] = useState<Array<ITabDataItem>>([
    {
      title: '全部',
      key: EDeafultTabKey.ALL,
      page: 0,
      total: 1,
      list: [],
    },
    {
      title: '待付款',
      key: EOrderType.PENDING_PAYMENT,
      page: 0,
      total: 1,
      list: [],
    },
    {
      title: '待发货',
      key: EOrderType.TO_BE_DELIVERED,
      page: 0,
      total: 1,
      list: [],
    },
    {
      title: '待收货',
      key: EOrderType.TO_BE_RECEIVED,
      page: 0,
      total: 1,
      list: [],
    },
    {
      title: '待评价',
      key: EOrderType.COMMENT,
      page: 0,
      total: 1,
      list: [],
    },
  ]);

  const currentTabIndex = tabData.findIndex((data) => data.key === type); // 根据type获取tabs中的current index;
  const [currentTab, setCurrentTab] = useState<number>(
    currentTabIndex === -1 ? 0 : currentTabIndex,
  ); // 当前tab

  /**
   *
   * @param page 对应tab的page
   * @param t 获取的订单类型
   */
  const getData = async (
    page: number,
    t: EOrderType | EDeafultTabKey = type,
  ) => {
    try {
      const { total, list } = await getOrderList({
        orderType: t,
        page,
      });
      setTabData((prev) => {
        const data: Array<ITabDataItem> = JSON.parse(JSON.stringify(prev));
        data[currentTab].total = total;
        data[currentTab].list =
          page === 1 ? list : data[currentTab].list.concat(list);
        data[currentTab].page = page;
        return data;
      });
    } catch (e) {}
  };

  useEffect(() => {
    getData(1, tabData[currentTab].key);
  }, [currentTab]);

  return (
    <View className={styles['order-list-wrapper']}>
      <View className={styles['search-product-wrapper']}>
        <AtSearchBar
          placeholder="输入搜索的商品名称"
          value=""
          fixed
          onChange={() => {}}
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
              <View className={styles['order-list']}>
                {item.list.map((data) => (
                  <OrderItem data={data} key={data.orderId} />
                ))}
              </View>
            </AtTabsPane>
          ))}
        </AtTabs>
      </View>
    </View>
  );
};

export default OrderList;
