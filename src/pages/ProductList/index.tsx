import React, { useEffect, useRef, useState } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { ScrollView, View } from '@tarojs/components';
import styles from './index.module.scss';
import {
  IProductListItem,
  IProductListPathParams,
  IProductListRequestParams,
} from './interface';
import { AtLoadMore, AtSearchBar, AtTabBar } from 'taro-ui';
import { getProductList } from '../../api/product';
import { EProductSortType } from './enums';
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

  const lastProductSortType = useRef<EProductSortType>(productSortType);

  const getData = async () => {
    setIsGetData(true);
    let params: IProductListRequestParams = {
      searchName: searchNameVal,
      productSortType,
    };
    if (categoriesId) Object.assign(params, { categoriesId: categoriesIdVal });

    try {
      const { total, list } = await getProductList(params, page === 1);
      setTotal(total);
      setData(page === 1 ? list : data.concat(list));
    } catch (e) {}
    setIsGetData(false);
  };

  const onSearch = () => {
    // 当有分类ID并且修改了searchName的时候，则需要重置分类ID，按照searchName进行搜索
    if (categoriesId) {
      setCategoriesIdVal(undefined);
    }
    if (page === 1) {
      getData();
    } else {
      setPage(1);
    }
  };

  useEffect(() => {
    getData();
    // 如果是状态变化，则需要进行请求方式判断
    if (lastProductSortType.current !== productSortType) {
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
      <ScrollView className={styles['product-list-con']}>
        {((page > 1 && isGetData) || (page === total && !isGetData)) && (
          <AtLoadMore status={(isGetData && 'loading') || 'noMore'} />
        )}
      </ScrollView>
    </View>
  );
};

export default ProductList;
