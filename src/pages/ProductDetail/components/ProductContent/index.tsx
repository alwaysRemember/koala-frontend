import Taro from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import '@tarojs/taro/html.css';
const ProductContent = ({ data }: { data: string }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  useEffect(() => {
    setIsShow(!!data);
  }, [data]);
  return (
    <View className={styles['product-content-wrapper']}>
      {(isShow && (
        <View
          className="taro_html"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      )) ||
        ''}
    </View>
  );
};

export default ProductContent;
