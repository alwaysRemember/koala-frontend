import React, { useEffect, useRef, useState } from 'react';
import Taro, { useDidHide, useDidShow } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import styles from './index.module.scss';
import { AtButton, AtIcon, AtLoadMore, AtSwipeAction } from 'taro-ui';
import { setClassName, transferAmount } from '../../utils';
import { IShoppingCartShowPageDataItem } from './interface';
import {
  deleteProductForShoppingCart,
  getShoppingCartProductList,
} from '../../api';
import ImagePreload from '../../components/ImagePreload';
import { showToast } from '../../utils/wxUtils';
import { appletHomePath, productDetailPath } from '../../router';
import { EProductStatus } from '../../enums/EProduct';
const ShoppingCart = () => {
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>(
    transferAmount(0, 'yuan') as string,
  );
  const [data, setData] = useState<Array<IShoppingCartShowPageDataItem>>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [isGetData, setIsGetData] = useState<boolean>(false);
  const [isInitGetData, setIsInitGetData] = useState<boolean>(true); // 是否初始化加载数据
  const scrollTop = useRef<number>(0); // 滚动高度
  const scrollTimed = useRef<NodeJS.Timeout>(); // scroll方法监听
  const [shoppingCartOpenId, setShoppingCartOpenId] = useState<string>('');
  const [showManagement, setShowManagement] = useState<boolean>(false); // 显示管理模块

  const getData = async () => {
    setIsGetData(true);
    try {
      const { list, total } = await getShoppingCartProductList(
        { page },
        page === 1,
      );
      const l = list.map<IShoppingCartShowPageDataItem>((item) => ({
        ...item,
        isSelect: false,
      }));
      const d = page === 1 ? l : data.concat(l);
      setData(d);
      setTotal(total);
    } catch (e) {}
    setIsGetData(false);
    setIsInitGetData(false);
  };

  const scroll = () => {
    if (isGetData) return;
    const p = page + 1;
    if (p > total) return;
    setPage(p);
  };

  /**
   * 删除单个产品点击
   * @param shoppingCartId
   */
  const productRemoveClick = (shoppingCartId: string) => {
    removeProductList([shoppingCartId]);
  };

  /**
   * 删除所选产品
   */
  const deleteSelectProduct = () => {
    const list = _getSelectProduct();
    if (!list.length) {
      showToast({
        title: '请选择要删除的商品',
      });
      return;
    }
    removeProductList(list.map((item) => item.shoppingCartId));
    setShowManagement(false);
  };

  /**
   * 删除产品
   * @param shoppingCartIdList 删除的购物车id数组
   */
  const removeProductList = async (shoppingCartIdList: Array<string>) => {
    try {
      await deleteProductForShoppingCart({ idList: shoppingCartIdList });
      await showToast({
        title: '删除成功',
      });
      scrollTop.current = 0;
      if (page === 1) {
        getData();
      } else {
        setPage(1);
      }
    } catch (e) {}
  };

  /**
   * 选择
   * @param shoppingCartId
   */
  const productSelect = (shoppingCartId: string) => {
    const index = data.findIndex(
      (item) => item.shoppingCartId === shoppingCartId,
    );
    if (index === -1) return;
    const d: Array<IShoppingCartShowPageDataItem> = JSON.parse(
      JSON.stringify(data),
    );
    d[index].isSelect = !d[index].isSelect;

    const hasNoSelect = !!d.filter((item) =>
      item.productStatus === EProductStatus.PUT_ON_SHELF
        ? !item.isSelect
        : false,
    ).length;
    setIsSelectAll(!hasNoSelect);
    setData(d);
  };

  /**
   * 获取选中的产品
   */
  const _getSelectProduct = (): Array<IShoppingCartShowPageDataItem> => {
    return data.filter((item) => item.isSelect);
  };

  useEffect(() => {
    getData();
  }, [page]);

  useDidShow(() => {
    getData();
  });
  useDidHide(() => {
    setData((prev) => {
      const list: Array<IShoppingCartShowPageDataItem> = JSON.parse(
        JSON.stringify(prev),
      );
      list.forEach((item) => {
        item.isSelect = false;
      });
      return list;
    });
    setIsSelectAll(false);
  });

  /* 监听全选或者反选 */
  useEffect(() => {
    if (!isSelectAll) return;
    setData((prev) => {
      let list: Array<IShoppingCartShowPageDataItem> = JSON.parse(
        JSON.stringify(prev),
      );
      return list.map((item) => ({
        ...item,
        isSelect:
          item.productStatus === EProductStatus.PUT_ON_SHELF
            ? isSelectAll
            : false,
      }));
    });
  }, [isSelectAll]);

  useEffect(() => {
    let amount = data
      .filter((item) => item.isSelect)
      .reduce((prev, c) => {
        console.log(c.amount, c.buyQuantity, c.productShipping);

        return prev + (c.amount * c.buyQuantity + c.productShipping);
      }, 0);
    setAmount(transferAmount(amount, 'yuan') as string);
  }, [data]);

  return (
    <View className={styles['shopping-cart-wrapper']}>
      <View className={styles['top-wrapper']}>
        <View className={styles['top']}>
          {(showManagement && (
            <Text
              className={styles['management']}
              onClick={() => {
                setShowManagement(false);
              }}
            >
              完成
            </Text>
          )) || (
            <Text
              className={styles['management']}
              onClick={() => {
                setShowManagement(true);
              }}
            >
              管理
            </Text>
          )}
        </View>
      </View>
      <ScrollView
        scrollY
        className={styles['product-list']}
        scrollTop={scrollTop.current}
        onScroll={({ detail: { scrollTop: top } }) => {
          scrollTimed.current && clearTimeout(scrollTimed.current);
          scrollTimed.current = setTimeout(() => {
            scrollTop.current = top;
          }, 500);
        }}
        onScrollToLower={scroll}
      >
        {data.map(
          ({
            productId,
            name,
            buyQuantity,
            buyConfigList,
            productStatus,
            productImg,
            productShipping,
            amount,
            isSelect,
            shoppingCartId,
          }) => (
            <AtSwipeAction
              onClick={() => {
                productRemoveClick(shoppingCartId);
              }}
              onOpened={() => setShoppingCartOpenId(shoppingCartId)}
              isOpened={shoppingCartId === shoppingCartOpenId}
              autoClose
              key={shoppingCartId}
              options={[
                {
                  text: '删除',
                  style: {
                    backgroundColor: '#e93b3d',
                  },
                },
              ]}
            >
              <View className={styles['product-item']}>
                <View
                  className={styles['select-wrapper']}
                  onClick={() => {
                    productSelect(shoppingCartId);
                  }}
                >
                  {(isSelect && (
                    <AtIcon
                      prefixClass="icon"
                      value="xuanzhong"
                      className={setClassName([
                        styles['select-icon'],
                        styles['on'],
                      ])}
                      size="28"
                    />
                  )) || (
                    <AtIcon
                      prefixClass="icon"
                      value="xuanzhongyuandian"
                      className={styles['select-icon']}
                      size="28"
                    />
                  )}
                </View>
                <View
                  className={styles['product-img']}
                  onClick={() => {
                    Taro.navigateTo({
                      url: productDetailPath({ productId }),
                    });
                  }}
                >
                  <ImagePreload
                    src={productImg}
                    width={180}
                    height={180}
                    borderRadius={14}
                  />
                </View>
                <View
                  className={styles['info']}
                  onClick={() => {
                    Taro.navigateTo({
                      url: productDetailPath({ productId }),
                    });
                  }}
                >
                  <Text className={styles['title']}>{name}</Text>
                  <View className={styles['product-config']}>
                    {buyConfigList.map((item) => item.name).join(' ')}
                  </View>
                  <View className={styles['amount-and-quantity']}>
                    <Text className={styles['amount']}>
                      单价: {transferAmount(amount, 'yuan')}
                    </Text>
                    <Text className={styles['quantity']}>X {buyQuantity}</Text>
                  </View>
                  <View className={styles['shipping-and-total-amount']}>
                    <Text className={styles['shipping']}>
                      运费: {transferAmount(productShipping, 'yuan')}
                    </Text>
                    <Text className={styles['total-amount']}>
                      ￥{' '}
                      {transferAmount(
                        amount * buyQuantity + productShipping,
                        'yuan',
                      )}
                    </Text>
                  </View>
                </View>
                {/* 失效产品 */}
                {productStatus !== EProductStatus.PUT_ON_SHELF && (
                  <View className={styles['expired-product']}>
                    <AtIcon
                      value="blocked"
                      className={styles['blocked']}
                      size="80"
                    />
                  </View>
                )}
              </View>
            </AtSwipeAction>
          ),
        )}

        {/* 没有数据 */}
        {!isInitGetData && !Number(data.length) && (
          <View className={styles['no-product']}>
            <View className={styles['no-product-con']}>
              <AtIcon
                prefixClass="icon"
                value="meiyoushuju"
                size="40"
                className={styles['no-product-icon']}
              />
              <Text className={styles['msg']}>购物车中没有商品啦~</Text>
              <AtButton
                type="primary"
                className={styles['go-home']}
                full
                onClick={() => {
                  Taro.switchTab({
                    url: appletHomePath(),
                  });
                }}
              >
                去购买
              </AtButton>
            </View>
          </View>
        )}
        {/* 加载中以及加载完毕 */}
        {((page > 1 && isGetData) || (page === total && !isGetData)) && (
          <AtLoadMore status={(isGetData && 'loading') || 'noMore'} />
        )}
      </ScrollView>
      <View className={styles['operation-wrapper']}>
        <View className={styles['operation-con']}>
          <View
            className={styles['select-wrapper']}
            onClick={() => {
              if (isSelectAll) return;
              setIsSelectAll((prev) => !prev);
            }}
          >
            {(isSelectAll && (
              <AtIcon
                prefixClass="icon"
                value="xuanzhong"
                className={setClassName([styles['select-icon'], styles['on']])}
                size="32"
              />
            )) || (
              <AtIcon
                prefixClass="icon"
                value="xuanzhongyuandian"
                className={styles['select-icon']}
                size="32"
              />
            )}
          </View>
          {(showManagement && (
            <View className={styles['management-btn-wrapper']}>
              <AtButton
                type="secondary"
                size="small"
                circle
                className={styles['remove-select-product']}
                onClick={deleteSelectProduct}
              >
                删除
              </AtButton>
            </View>
          )) || (
            <View className={styles['amount-and-buy']}>
              <View className={styles['amount-wrapper']}>
                <Text className={styles['label']}>合计</Text>
                <Text className={styles['amount']}>¥ {amount}</Text>
              </View>
              <AtButton type="primary" className={styles['pay']}>
                支付
              </AtButton>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ShoppingCart;
