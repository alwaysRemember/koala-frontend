import Taro from '@tarojs/taro';
import { AtList, AtListItem } from 'taro-ui';
import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const ProductParameter = ({
  data = [],
}: {
  data: Array<{ key: string; value: string }>;
}) => {
  return (
    <View className={styles['product-parameter-wrapper']}>
      <Text className={styles['product-parameter-title']}>商品参数</Text>
      <View className={styles['product-parameter-list']}>
        {data.map(({ value, key }) => (
          <View className={styles['product-parameter-item']} key={key}>
            <Text className={styles['label']}>{key}</Text>
            <Text className={styles['value']}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default ProductParameter;
