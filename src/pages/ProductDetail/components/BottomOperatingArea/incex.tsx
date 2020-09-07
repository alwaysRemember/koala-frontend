import Taro from '@tarojs/taro';
import { AtButton } from 'taro-ui';
import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import { AtIcon } from 'taro-ui';
import { IBottomOperatingArea } from './interface';
import { setClassName } from '../../../../utils';

const BottomOperatingArea = ({ favorites = false }: IBottomOperatingArea) => {
  return (
    <View className={styles['operating-area-wrapper']}>
      <View className={styles['operating-area-con']}>
        <View className={styles['operating-area-item']}>
          <AtIcon prefixClass="icon" className={styles['icon']} value="kefu" />
          <Text className={styles['label']}>客服</Text>
        </View>
        <View className={styles['operating-area-item']}>
          <AtIcon
            prefixClass="icon"
            className={setClassName(['iconfont', styles['icon']])}
            value="shoucang1"
            color={`${favorites ? '#e93b3d' : ''}`}
          />
          <Text className={styles['label']}>收藏</Text>
        </View>
        <AtButton
          type="primary"
          size="small"
          className={setClassName([
            styles['operating-area-item'],
            styles['btn'],
          ])}
        >
          加入购物车
        </AtButton>
        <AtButton
          type="primary"
          size="small"
          className={setClassName([
            styles['operating-area-item'],
            styles['btn'],
          ])}
        >
          立即购买
        </AtButton>
      </View>
    </View>
  );
};
export default BottomOperatingArea;
