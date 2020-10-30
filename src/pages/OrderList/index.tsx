import { View, ScrollView, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import React, { useEffect, useRef, useState } from 'react';
import { getOrderList } from '../../api';
import {
  AtTabs,
  AtTabsPane,
  AtSearchBar,
  AtDivider,
  AtLoadMore,
} from 'taro-ui';
import { EOrderType } from '../../enums/EOrder';
import styles from './index.module.scss';
import {
  ITabDataItem,
  EDeafultTabKey,
  IOrderListPathParams,
} from './interface';
import OrderItem from './components/OrderItem';
import ReturnOfGoodsModal from '../../components/ReturnOfGoodsModal';
import RefundCourierInfoModal from '../../components/RefundCourierInfoModal';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { IReducers } from '../../store/reducers/interface';
import { updatePageChangeGetDataType } from '../../store/actions';
import { searchOrderPagePath } from '../../router';
const OrderList = () => {
  const {
    params: { type = EDeafultTabKey.ALL },
  } = useRouter<IOrderListPathParams>();
  const dispatch = useDispatch();
  const { pageChangeGetDataType } = useMappedState<IReducers>((state) => state);
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
  const scrollTop = useRef<number>(0); // 滚动高度
  const scrollTimed = useRef<NodeJS.Timeout>(); // scroll方法监听
  const refresherTriggered = useRef<boolean>(false);

  /**
   *
   * @param page 对应tab的page
   * @param t 获取的订单类型
   * @param isShowLoading 是否需要显示请求的loading组件
   */
  const getData = async (
    page: number,
    t: EOrderType | EDeafultTabKey = type,
    isShowLoading: boolean = true,
    isForciblyUpdate: boolean = false,
  ) => {
    if (isGetData && !isForciblyUpdate) return;
    setIsGetData(true);
    try {
      const { total, list } = await getOrderList(
        {
          orderType: t,
          page,
        },
        isShowLoading,
      );
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
    // 重置请求中提示
    isShowScrollMsg && setIsShowScrollMsg(false);
    // 重置下拉刷新控件
    if (refresherTriggered.current) {
      refresherTriggered.current = false;
    }
    setIsGetData(false);
  };

  const scroll = () => {
    // 禁止重复请求数据
    if (isGetData) return;
    const { page, key, total } = tabData[currentTab];
    const p = page + 1;
    if (p > total) {
      return;
    }
    setIsShowScrollMsg(true);

    getData(p, key, false);
  };

  useEffect(() => {
    setIsShowPageDataEnd(false);
    setIsShowScrollMsg(false);
    getData(1, tabData[currentTab].key);
  }, [currentTab]);

  useEffect(() => {
    if (isShowPageDataEnd) setIsShowScrollMsg(false);
  }, [isShowPageDataEnd]);

  useDidShow(() => {
    if (pageChangeGetDataType) {
      getData(1, tabData[currentTab].key);
      dispatch(updatePageChangeGetDataType(false));
    }
  });

  return (
    <View className={styles['order-list-wrapper']}>
      <View
        className={styles['search-product-wrapper']}
        onClick={() => {
          Taro.navigateTo({
            url: searchOrderPagePath(),
          });
        }}
      >
        <AtSearchBar
          disabled
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
            scrollTop.current = 0;
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
                scrollTop={scrollTop.current}
                onScroll={({ detail: { scrollTop: top } }) => {
                  scrollTimed.current && clearTimeout(scrollTimed.current);
                  scrollTimed.current = setTimeout(() => {
                    scrollTop.current = top;
                  }, 500);
                }}
                refresherTriggered={refresherTriggered.current}
                refresherEnabled
                refresherBackground="#f5f5f5"
                onRefresherRefresh={() => {
                  refresherTriggered.current = true;
                  getData(1, tabData[currentTab].key, true);
                }}
              >
                <View className={styles['order-list-con']}>
                  {item.list.map((data) => (
                    <OrderItem
                      data={data}
                      key={data.orderId}
                      changeData={() => {
                        getData(1, item.key, true, true);
                      }}
                    />
                  ))}
                </View>
                {/* 加载完毕所有数据 */}
                {isShowPageDataEnd && !!item.list.length && (
                  <AtDivider
                    className={styles['page-data-end']}
                    content="没有更多订单了"
                  />
                )}
                {/* 数据加载中 */}
                {isShowScrollMsg && <AtLoadMore status="loading" />}

                {/* 无订单 */}
                {!!(!item.list.length && item.page) && (
                  <View className={styles['no-order']}>
                    <AtIcon
                      prefixClass="icon"
                      value="qunfengzanwudingdan"
                      className={styles['no-order-icon']}
                      size={44}
                    />
                    <Text className={styles['msg']}>暂无订单,赶紧下单吧~</Text>
                  </View>
                )}
              </ScrollView>
            </AtTabsPane>
          ))}
        </AtTabs>
      </View>
      {/* 退款modal */}
      <ReturnOfGoodsModal />
      {/* 退货信息填写 */}
      <RefundCourierInfoModal />
    </View>
  );
};

export default OrderList;
