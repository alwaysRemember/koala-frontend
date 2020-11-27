import Taro from '@tarojs/taro';
import { AtButton } from 'taro-ui';
import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import { AtIcon } from 'taro-ui';
import { IBottomOperatingArea } from './interface';
import { setClassName } from '../../../../utils';
import { appletHomePath } from '../../../../router';
import { EProductStatus } from '../../../../enums/EProduct';

const BottomOperatingArea = ({
  productStatus,
  favorites = false,
  favoriteChange,
  buyNow,
  saveToShoppingCart,
}: IBottomOperatingArea) => {
  return (
    <View className={styles['operating-area-wrapper']}>
      <View className={styles['operating-area-con']}>
        <View
          className={styles['operating-area-item']}
          onClick={() => {
            Taro.switchTab({
              url: appletHomePath(),
            });
          }}
        >
          <AtIcon prefixClass="icon" className={styles['icon']} value="zhuye" />
          <Text className={styles['label']}>主页</Text>
        </View>
        <View
          className={styles['operating-area-item']}
          onClick={() => favoriteChange(favorites)}
        >
          <AtIcon
            prefixClass="icon"
            className={setClassName([
              'iconfont',
              favorites ? styles['icon'] : '',
            ])}
            value="shoucang1"
          />
          <Text className={styles['label']}>收藏</Text>
        </View>
        <AtButton
          type="primary"
          size="small"
          disabled={!(productStatus === EProductStatus.PUT_ON_SHELF)}
          className={setClassName([
            styles['operating-area-item'],
            styles['btn'],
          ])}
          onClick={saveToShoppingCart}
        >
          加入购物车
        </AtButton>
        <AtButton
          type="primary"
          size="small"
          disabled={!(productStatus === EProductStatus.PUT_ON_SHELF)}
          className={setClassName([
            styles['operating-area-item'],
            styles['btn'],
          ])}
          onClick={() => {
            buyNow();
          }}
        >
          立即购买
        </AtButton>
      </View>
    </View>
  );
};
export default BottomOperatingArea;
