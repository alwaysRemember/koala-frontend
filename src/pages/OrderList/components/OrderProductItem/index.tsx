import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import { IProductItem } from '../../interface';
import ImagePreload from '../../../../components/ImagePreload';
import { transferAmount } from '../../../../utils';
import styles from './index.module.scss';
import { productDetailPath } from '../../../../router';
const OrderProductItem = ({
  productList,
  canClickProduct = false,
}: {
  productList: Array<IProductItem>;
  canClickProduct?: boolean;
}) => {
  return (
    <View className={styles['product-list']}>
      {productList.map((item) => (
        <View
          className={styles['product-item']}
          key={item.productId}
          onClick={() => {
            if (!canClickProduct) return;
            Taro.navigateTo({
              url: productDetailPath({
                productId: item.productId,
              }),
            });
          }}
        >
          <View className={styles['img']}>
            <ImagePreload
              src={item.img}
              width={180}
              height={180}
              borderRadius={14}
            />
          </View>
          {/* 商品信息 */}
          <View className={styles['product-info']}>
            <Text className={styles['product-name']}>{item.name}</Text>
            <View className={styles['config-and-quantity']}>
              <Text className={styles['config']}>
                {item.productConfigList.join(' ')}
              </Text>
              {!!item.buyQuantity && (
                <Text className={styles['quantity']}>X {item.buyQuantity}</Text>
              )}
            </View>
            <Text className={styles['amount']}>
              ¥ {transferAmount(item.amount, 'yuan')}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default OrderProductItem;
