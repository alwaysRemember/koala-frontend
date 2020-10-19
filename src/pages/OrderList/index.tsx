import { View, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
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

  const [isShowPageDataEnd, setIsShowPageDataEnd] = useState<boolean>(false); // 是否显示数据请求完毕
  const [isShowScrollMsg, setIsShowScrollMsg] = useState<boolean>(false); // 是否显示分页滚动提示
  const [isGetData, setIsGetData] = useState<boolean>(false); // 是否正在请求数据

  /**
   *
   * @param page 对应tab的page
   * @param t 获取的订单类型
   */
  const getData = async (
    page: number,
    t: EOrderType | EDeafultTabKey = type,
  ) => {
    if (isGetData) return;
    setIsGetData(true);
    try {
      const { total, list } = await getOrderList({
        orderType: t,
        page,
      });
      console.log(currentTab);

      setTabData((prev) => {
        const data: Array<ITabDataItem> = JSON.parse(JSON.stringify(prev));
        data[currentTab].total = total;
        data[currentTab].list =
          page === 1 ? list : data[currentTab].list.concat(list);
        data[currentTab].page = page;
        return data;
      });
      // 判断是否数据都请求了
      if (page === total) {
        setIsShowPageDataEnd(true);
      }
    } catch (e) {}
    isShowScrollMsg && setIsShowScrollMsg(false);

    setIsGetData(false);
  };

  const scroll = () => {
    // 禁止重复请求数据
    if (isGetData) return;
    setIsShowScrollMsg(true);
    const { page, key, total } = tabData[currentTab];
    const p = page + 1;
    if (p > total) {
      // TODO show end
      return;
    }
    getData(p, key);
  };

  useEffect(() => {
    setIsShowPageDataEnd(false);
    setIsShowScrollMsg(false);
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
          className={styles['tabs-wrapper']}
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
              <ScrollView
                className={styles['order-list']}
                enableBackToTop
                scrollY
                onScrollToLower={scroll}
              >
                {item.list.map((data) => (
                  <OrderItem data={data} key={data.orderId} />
                ))}
              </ScrollView>
            </AtTabsPane>
          ))}
        </AtTabs>
      </View>
    </View>
  );
};

export default OrderList;
