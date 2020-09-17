import React from 'react';
import Taro from '@tarojs/taro';
import { AtButton } from 'taro-ui';
import { View, Text, Image } from '@tarojs/components';
import styles from './index.module.scss';
import { IFeaturedItem } from '../../interface';
import { productDetailPath } from '../../../../router';
import ImagePreload from '../../../../components/ImagePreload';

const Featured = ({ featuredList }: { featuredList: Array<IFeaturedItem> }) => {
  /**
   * 产品跳转
   * @param id
   */
  const productClick = (id) => {
    Taro.navigateTo({
      url: productDetailPath({ productId: id }),
    });
  };
  return (
    <View className={styles['featured-wrapper']}>
      <Text className={styles['featured-title']}>精选推荐</Text>
      {featuredList &&
        featuredList.map((item: IFeaturedItem) => (
          <View
            className={styles['featured-product-item']}
            key={item.id}
            onClick={() => productClick(item.id)}
          >
            <View className={styles['logo']}>
              <ImagePreload
                src={item.logo}
                width={214}
                height={214}
                borderRadius={14}
              />
            </View>
            <View className={styles['featured-product-info']}>
              <Text className={styles['prodcut-name']}>{item.name}</Text>
              <Text className={styles['product-introduction']}>
                {item.introduction}
              </Text>
              <View className={styles['product-amount-wrapper']}>
                <View className={styles['product-amount']}>
                  <Text className={styles['amount-label']}>限时价 </Text>
                  <Text className={styles['amount']}>¥{item.amount / 100}</Text>
                </View>
                <AtButton type="primary" size="small" circle>
                  立即抢购
                </AtButton>
              </View>
            </View>
          </View>
        ))}
    </View>
  );
};

export default Featured;
