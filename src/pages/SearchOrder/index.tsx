import React, { useEffect, useRef, useState } from 'react';
import Taro, { useDidShow, usePageScroll } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import styles from './index.module.scss';
import { AtDivider, AtIcon, AtSearchBar } from 'taro-ui';
import { showToast } from '../../utils/wxUtils';
import { searchOrder } from '../../api';
import { IOrderDataItem } from '../OrderList/interface';
import OrderItem from '../OrderList/components/OrderItem';
import ReturnOfGoodsModal from '../../components/ReturnOfGoodsModal';
import RefundCourierInfoModal from '../../components/RefundCourierInfoModal';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { IReducers } from '../../store/reducers/interface';
import { updatePageChangeGetDataType } from '../../store/actions';

const SearchOrder = () => {
  const dispatch = useDispatch();
  const { pageChangeGetDataType } = useMappedState<IReducers>((state) => state);

  const [searchValue, setSearchValue] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [data, setData] = useState<Array<IOrderDataItem>>([]);
  const [isShowPageDataEnd, setIsShowPageDataEnd] = useState<boolean>(false);

  const isRequest = useRef<boolean>(false); // 是否请求过数据

  const scrollTop = useRef<number>(0); // 滚动高度
  const scrollTimed = useRef<NodeJS.Timeout>(); // scroll方法监听

  // 搜索操作
  const searchData = () => {
    if (!searchValue) {
      showToast({
        title: '请输入正确的商品名称',
      });
      return;
    }
    scrollTop.current = 0;
    if (page === 1) {
      getData();
    } else {
      setPage(1);
    }
    if (!isRequest.current) {
      isRequest.current = true;
    }
  };

  /**
   * 获取数据
   */
  const getData = async () => {
    try {
      const { total, list } = await searchOrder({
        searchValue,
        page: page,
      });
      setIsShowPageDataEnd(page === total);
      setData(page === 1 ? list : data.concat(list));
      setTotalPage(total);
    } catch (e) {}
  };

  const scroll = () => {
    if (page + 1 <= totalPage) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (searchValue) {
      getData();
    }
  }, [page]);

  useDidShow(() => {
    if (pageChangeGetDataType) {
      if (page === 1) {
        getData();
      } else {
        setPage(1);
      }
      dispatch(updatePageChangeGetDataType(false));
    }
  });

  return (
    <View className={styles['search-order-wrapper']}>
      <AtSearchBar
        placeholder="输入搜索的商品名称"
        value={searchValue}
        fixed
        focus
        onConfirm={searchData}
        onActionClick={searchData}
        onChange={(value) => {
          setSearchValue(value);
        }}
      />
      <View className={styles['order-list-wrapper']}>
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
        >
          <View className={styles['order-list-con']}>
            {data.map((item) => (
              <OrderItem
                data={item}
                changeData={() => {
                  if (page === 1) {
                    getData();
                  } else {
                    setPage(1);
                  }
                }}
              />
            ))}
            {/* 加载完毕所有数据 */}
            {isShowPageDataEnd && !!data.length && (
              <AtDivider
                className={styles['page-data-end']}
                content="没有更多订单了"
              />
            )}
            {/* 无订单 */}
            {!data.length && isRequest.current && (
              <View className={styles['no-order']}>
                <AtIcon
                  prefixClass="icon"
                  value="qunfengzanwudingdan"
                  className={styles['no-order-icon']}
                  size={44}
                />
                <Text className={styles['msg']}>没有搜索到订单信息</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      {/* 退款modal */}
      <ReturnOfGoodsModal />
      {/* 退货信息填写 */}
      <RefundCourierInfoModal />
    </View>
  );
};

export default SearchOrder;
