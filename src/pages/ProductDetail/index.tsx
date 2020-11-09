import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro';
import React, { useState, useEffect, useRef } from 'react';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { View, Text } from '@tarojs/components';
import {
  IProductDetailResponse,
  IProductConfig,
  IProductConfigModuleItem,
  IProductConfigModuleOption,
  IProductDetailPathParams,
} from './interface';
import { EProductStatus } from '../../enums/EProduct';
import { getProductDetail, favoriteProduct } from '../../api/product';
import { showToast } from '../../utils/wxUtils';
import Banner from './components/Banner';
import styles from './index.module.scss';
import { transferAmount, setClassName, pathParamsTransfer } from '../../utils';
import BottomOperatingArea from './components/BottomOperatingArea';
import ProductParameter from './components/ProductParameter';
import ProductContent from './components/ProductContent';
import SelectProductConfig from './components/SelectProductConfig';
import { ISelectProductConfigRef } from './components/SelectProductConfig/interface';
import { useDispatch } from 'redux-react-hook';
import { orderConfirmPath } from '../../router';
import { updateOrderConfirmProductList } from '../../store/actions';
const ProductDetail = () => {
  let { params, path } = useRouter<IProductDetailPathParams>();
  const productId = params.productId;
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [data, setData] = useState<IProductDetailResponse>({
    productId: '',
    productVideo: {
      id: '',
      url: '',
    },
    productBanner: [],
    productAmount: 0,
    productName: '',
    productStatus: EProductStatus.PUT_ON_SHELF,
    productType: true, // 是否为7天无理由退款商品
    productBrief: '', // 产品简介
    productContent: '', // 产品内容介绍
    productParameter: [], // 产品参数
    productConfigList: [], // 产品配置
    productDeliveryCity: '', // 发货地点
    productSales: 0, // 产品销量
    productShipping: 0,
    productFavorites: false,
    productMainImg: '',
  });

  const [productAmount, setProductAmount] = useState<string>(''); // 显示在页面中的金额，可能为区间
  const [productConfigList, setProductConfigList] = useState<
    Array<IProductConfigModuleItem>
  >([]); // 产品配置中的分类

  const [selectProductConfigList, setProducgtConfitList] = useState<
    Array<IProductConfigModuleOption>
  >([]); // 选择的数据

  const [currentTab, setCurrentTab] = useState<number>(0); // 当前选中的标签页
  const selectProductConfigRef = useRef<ISelectProductConfigRef>({
    changeShow: () => {},
    getBuyQuantity: () => 1,
  });

  const getData = async () => {
    try {
      if (!productId) return;
      const data = await getProductDetail({ productId });
      setData(data);
      setPageLoading(true);
      if (data.productStatus !== EProductStatus.PUT_ON_SHELF) {
        showToast({
          title: '当前商品审核中或已下架 ',
        });
      }
    } catch (e) {}
  };

  /**
   * 收藏状态切换
   * @param type  当前的收藏状态
   */
  const favoriteChange = async (type) => {
    if (data.productStatus !== EProductStatus.PUT_ON_SHELF) {
      showToast({
        title: '当前商品不支持此操作',
      });
      return;
    }
    try {
      const { favoriteType } = await favoriteProduct({
        productId,
        favoriteType: !type,
      });
      setData((prev) =>
        Object.assign({}, prev, {
          productFavorites: favoriteType,
        }),
      );
    } catch (e) {}
  };

  /**
   * 立即购买
   * @param type  调用的地方
   */
  const buyNow = (type: 'page' | 'modal' = 'page') => {
    // 需要选择配置的情况 判断是否选择了配置
    if (productConfigList.length && !selectProductConfigList.length) {
      // 判断是否在主页调用的method
      if (type === 'page') {
        selectProductConfigRef.current.changeShow(true);
      } else {
        showToast({
          title: `请选择商品的${productConfigList.map(
            ({ categoryName }) => categoryName,
          )}`,
        });
      }
      return;
    }

    // 存储下单数据
    dispatch(
      updateOrderConfirmProductList([
        {
          productId,
          productAmount: data.productAmount,
          selectProductConfigList: selectProductConfigList,
          buyQuantity: selectProductConfigRef.current.getBuyQuantity(),
          productShipping: data.productShipping,
          productMainImg: data.productMainImg,
          productName: data.productName,
        },
      ]),
    );
    // 在选择配置modal中下单则需要在跳转前关闭modal
    if (type === 'modal') {
      selectProductConfigRef.current.changeShow(false);
    }
    Taro.navigateTo({
      url: orderConfirmPath(),
    });
  };

  /**
   * 根据产品配置转换为产品金额
   * @param type  取最小值还是最大值
   */
  const _transferProductAmount = (type: 'min' | 'max'): string => {
    const { productConfigList, productAmount } = data;
    let currentData: IProductConfig = productConfigList[0];
    productConfigList.forEach((item) => {
      const result: boolean =
        type === 'min'
          ? item.amount < currentData.amount
          : item.amount > currentData.amount;
      if (result) currentData = item;
    });
    return transferAmount(currentData.amount + productAmount, 'yuan') as string;
  };

  /**
   * 获取产品配置中的分类
   */
  const _formatProductConfigList = (): Array<IProductConfigModuleItem> => {
    const list: Array<IProductConfigModuleItem> = [];
    data.productConfigList.forEach((item) => {
      const index: number = list.findIndex(
        (current) => current.categoryName === item.categoryName,
      );
      const data: IProductConfigModuleOption = Object.assign({}, item, {
        isSelect: false,
      });
      if (index > -1) {
        list[index].list = list[index].list.concat([data]);
      } else {
        list.push({
          categoryName: item.categoryName,
          list: [data],
        });
      }
    });
    return list;
  };

  useEffect(() => {
    (productId && getData()) ||
      showToast({
        title: '产品ID为空',
      });
  }, [productId]);

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: data.productName,
    });
    // 设置显示的产品金额
    const { productConfigList, productAmount } = data;

    // 设置显示的产品金额
    if (productConfigList.length) {
      setProductAmount(
        `${_transferProductAmount('min')}-${_transferProductAmount('max')}`,
      );
    } else {
      setProductAmount(productAmount.toFixed(2));
    }

    // 设置产品配置分类
    setProductConfigList(_formatProductConfigList());
  }, [data]);

  /* 设置分享功能 */
  useEffect(() => {
    Taro.showShareMenu({
      withShareTicket: true,
    });
  }, []);
  useShareAppMessage(() => {
    return {
      title: data.productName,
      path: `${path}${pathParamsTransfer(params)}`,
    };
  });
  return (
    <View
      className={setClassName([
        styles['detail-wrapper'],
        pageLoading ? '' : styles['skeleton'],
      ])}
    >
      {/* banner */}
      <Banner
        video={data.productVideo}
        bannerList={data.productBanner}
        pageLoading={pageLoading}
      />
      {/* 主要产品介绍 */}
      <View className={styles['product-info']}>
        <Text className={styles['product-amount']}>¥ {productAmount}</Text>
        <Text className={styles['product-name']}>{data.productName}</Text>
        <View className={styles['delivery-info']}>
          <Text className={styles['delivery-info-item']}>
            <Text className={styles['label']}>发货</Text> :{' '}
            {data.productDeliveryCity}
          </Text>
          <Text className={styles['delivery-info-item']}>
            <Text className={styles['label']}>快递费</Text> : ¥
            {transferAmount(data.productShipping, 'yuan')}元
          </Text>
          <Text className={styles['delivery-info-item']}>
            <Text className={styles['label']}>销量</Text> : {data.productSales}
          </Text>
        </View>
        {/* 选择规格 */}
        {!!data.productConfigList.length && (
          <View
            className={styles['select-product-config']}
            onClick={() => selectProductConfigRef.current.changeShow(true)}
          >
            <Text className={styles['tips']}>
              {!!selectProductConfigList.length ? '当前选择' : '请选择'}
              {!!selectProductConfigList.length
                ? selectProductConfigList.map(({ name }) => (
                    <Text key={name}> {name}</Text>
                  ))
                : productConfigList.map(({ categoryName }) => (
                    <Text key={categoryName}> {categoryName}</Text>
                  ))}
            </Text>

            <View
              className={setClassName([
                'at-icon',
                'at-icon-chevron-right',
                styles['icon'],
              ])}
            />
          </View>
        )}
      </View>
      {/* tabs页面 */}
      <AtTabs
        className={styles['tabs-wrapper']}
        tabList={[{ title: '商品详情' }, { title: '商品参数' }]}
        current={currentTab}
        onClick={(value) => setCurrentTab(value)}
      >
        <AtTabsPane current={currentTab} index={0}>
          <ProductContent data={data.productContent} />
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={1}>
          <ProductParameter data={data.productParameter} />
        </AtTabsPane>
      </AtTabs>

      {/* 底部操作区 */}
      <BottomOperatingArea
        productStatus={data.productStatus}
        favorites={data.productFavorites}
        favoriteChange={favoriteChange}
        buyNow={buyNow}
      />

      {/* 选择产品配置 */}
      <SelectProductConfig
        cref={selectProductConfigRef}
        productConfig={productConfigList}
        productShowAmount={productAmount}
        selectProductConfigListChange={(list) => {
          setProducgtConfitList(list);
        }}
        data={data}
        buyNow={buyNow}
      />
    </View>
  );
};

export default ProductDetail;
