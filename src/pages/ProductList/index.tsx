import React, { useEffect, useRef, useState } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { ScrollView, View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import {
  IProductListItem,
  IProductListPathParams,
  IProductListRequestParams,
} from './interface';
import { AtIcon, AtLoadMore, AtSearchBar, AtTabBar } from 'taro-ui';
import { getProductList } from '../../api/product';
import { EProductSortType } from './enums';
import ImagePreload from '../../components/ImagePreload';
import { showToast } from '../../utils/wxUtils';
import { productDetailPath } from '../../router';
const ProductList = () => {
  const {
    params: { categoriesId, searchName },
  } = useRouter<IProductListPathParams>();
  const [total, setTotal] = useState<number>(1);
  const [data, setData] = useState<Array<IProductListItem>>([]);
  const [page, setPage] = useState<number>(1);
  const [isGetData, setIsGetData] = useState<boolean>(false);

  const [categoriesIdVal, setCategoriesIdVal] = useState<string | undefined>(
    categoriesId,
  );
  const [searchNameVal, setSearchNameVal] = useState<string>(searchName);

  const [currentTab, setCurrentTab] = useState<number>(0);
  const [productSortType, setProductSortType] = useState<EProductSortType>(
    EProductSortType.SALES,
  );

  const [isInitGetData, setIsInitGetData] = useState<boolean>(true); // 是否初始化加载数据

  const lastProductSortType = useRef<EProductSortType>(productSortType);
  const scrollTop = useRef<number>(0); // 滚动高度
  const scrollTimed = useRef<NodeJS.Timeout>(); // scroll方法监听

  const getData = async () => {
    setIsGetData(true);
    let params: IProductListRequestParams = {
      searchName: searchNameVal,
      productSortType,
      page,
    };
    if (categoriesId) Object.assign(params, { categoriesId: categoriesIdVal });

    try {
      const { total, list } = await getProductList(params, page === 1);
      setTotal(total);
      setData(page === 1 ? list : data.concat(list));
    } catch (e) {}
    setIsGetData(false);
    setIsInitGetData(false);
  };

  const onSearch = () => {
    if (!searchNameVal) {
      showToast({
        title: '请输入要搜索的商品',
      });
      return;
    }
    if (page === 1) {
      getData();
    } else {
      setPage(1);
    }
  };

  const onScrollToLower = () => {
    if (isGetData) return;
    const p = page + 1;
    if (p > total) return;
    setPage(p);
  };

  useEffect(() => {
    getData();
    // 如果是状态变化，则需要进行请求方式判断
    if (lastProductSortType.current !== productSortType) {
      scrollTop.current = 0;
      if (page === 1) {
        getData();
      } else {
        setPage(1);
      }
      return;
    }
    getData();
  }, [page, productSortType]);

  useEffect(() => {
    let type: EProductSortType | undefined = undefined;
    switch (currentTab) {
      case 0:
        type = EProductSortType.SALES;
        break;
      case 1:
        type = EProductSortType.AMOUNT_ASE;
        break;
      case 2:
        type = EProductSortType.AMOUNT_DESC;
        break;
      default:
    }
    if (!type) return;
    setProductSortType(type);
  }, [currentTab]);

  // 存储上次的状态变化
  useEffect(() => {
    lastProductSortType.current = productSortType;
  });

  return (
    <View className={styles['product-list-wrapper']}>
      <View className={styles['top-operation']}>
        <View className={styles['top-operation-con']}>
          <AtSearchBar
            value={searchNameVal}
            onChange={(value) => {
              // 当有分类ID并且修改了searchName的时候，则需要重置分类ID，按照searchName进行搜索
              if (categoriesId && categoriesIdVal) {
                setCategoriesIdVal(undefined);
              }
              setSearchNameVal(value.trim());
            }}
            onConfirm={onSearch}
            onActionClick={onSearch}
          />
          <AtTabBar
            tabList={[
              { title: '销量' },
              { title: '价格从低到高' },
              { title: '价格从高到低' },
            ]}
            current={currentTab}
            onClick={(i) => {
              setCurrentTab(i);
            }}
          />
        </View>
      </View>
      <ScrollView
        className={styles['product-list-con']}
        scrollTop={scrollTop.current}
        onScroll={({ detail: { scrollTop: top } }) => {
          scrollTimed.current && clearTimeout(scrollTimed.current);
          scrollTimed.current = setTimeout(() => {
            scrollTop.current = top;
          }, 500);
        }}
        onScrollToLower={onScrollToLower}
      >
        {data.map(
          ({
            productId,
            amount,
            imgPath,
            name,
            productSales,
            productDeliveryCity,
          }) => (
            <View
              className={styles['product-item']}
              key={productId}
              onClick={() => {
                Taro.navigateTo({
                  url: productDetailPath({
                    productId,
                  }),
                });
              }}
            >
              <View className={styles['product-img']}>
                <ImagePreload
                  src={imgPath}
                  width={180}
                  height={180}
                  borderRadius={14}
                />
              </View>
              <View className={styles['info']}>
                <View className={styles['name']}>{name}</View>
                <View className={styles['sales-and-city']}>
                  <Text className={styles['city']}>{productDeliveryCity}</Text>
                  <Text className={styles['sales']}>销量：{productSales}</Text>
                </View>
                <Text className={styles['amount']}> ¥ {amount}元</Text>
              </View>
            </View>
          ),
        )}

        {/* 没有数据 */}
        {!isInitGetData && !Number(data.length) && (
          <View className={styles['no-product']}>
            <AtIcon
              prefixClass="icon"
              value="meiyoushuju"
              size="40"
              className={styles['no-product-icon']}
            />
            <Text className={styles['msg']}>没有找到您需要的商品~</Text>
          </View>
        )}
        {/* 加载中以及加载完毕 */}
        {((page > 1 && isGetData) || (page === total && !isGetData)) && (
          <AtLoadMore status={(isGetData && 'loading') || 'noMore'} />
        )}
      </ScrollView>
    </View>
  );
};

export default ProductList;
