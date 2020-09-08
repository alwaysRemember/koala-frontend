import Taro from '@tarojs/taro';
import React, { useState, useImperativeHandle } from 'react';
import styles from './index.module.scss';
import { ISelectProductConfig } from './interface';
import { AtFloatLayout } from 'taro-ui';
import { View, Text, Image } from '@tarojs/components';
import ImagePreload from '../../../../components/ImagePreload';
const SelectProductConfig = ({
  productAmount,
  productConfig,
  productMainImg,
  cref,
}: ISelectProductConfig) => {
  useImperativeHandle(cref, () => ({
    changeShow: (type) => {
      setShow(type);
    },
  }));

  const [show, setShow] = useState<boolean>(true);
  return (
    <AtFloatLayout
      isOpened={show}
      onClose={() => setShow(false)}
      scrollY
      className={styles['product-config-modal-wrapper']}
    >
      <View className={styles['product-config-modal-con']}>
        <View className={styles['product-info']}>
          {/* <Image src={productMainImg} mode="widthFix" lazyLoad className={styles["product-main-img"]} /> */}
          <View className={styles['product-main-img']}>
            <ImagePreload src={productMainImg} width={215} height={215} />
          </View>
        </View>
      </View>
    </AtFloatLayout>
  );
};

export default SelectProductConfig;
