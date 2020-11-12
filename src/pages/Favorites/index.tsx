import React, { useEffect, useState } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import { AtSwipeAction, AtIcon } from 'taro-ui';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import { getFavoritesData, removeFavorites } from '../../api';
import { IFavoritesItem } from './interface';
import ImagePreload from '../../components/ImagePreload';
import { transferAmount } from '../../utils';
import { EProductStatus } from '../../enums/EProduct';
import { productDetailPath } from '../../router';
import { showToast } from '../../utils/wxUtils';
const favorites = () => {
  const [data, setData] = useState<Array<IFavoritesItem>>([]);
  const [isOpenedIndex, setIsOpenedIndex] = useState<number>();

  const getData = async () => {
    try {
      const { list } = await getFavoritesData();
      setData(list);
    } catch (e) {}
  };

  const favoriteClick = (productId: string, productStatus: EProductStatus) => {
    if (productStatus !== EProductStatus.PUT_ON_SHELF) return;
    Taro.navigateTo({
      url: productDetailPath({ productId }),
    });
  };

  const actionClick = async (favoritesId: number, index: number) => {
    try {
      await removeFavorites({ favoritesId });
      showToast({
        title: '删除成功',
      });
      const list: Array<IFavoritesItem> = JSON.parse(JSON.stringify(data));
      list.splice(index, 1);
      setData(list);
    } catch (e) {}
  };

  useDidShow(() => {
    getData();
  });

  return (
    <View
      className={styles['favorites-wrapper']}
      onClick={() => {
        setIsOpenedIndex(undefined);
      }}
    >
      <View className={styles['favorites-list']}>
        {data.map(
          (
            { productId, img, name, amount, productStatus, favoritesId },
            index,
          ) => (
            <View className={styles['favorites-item-wrapper']}>
              <AtSwipeAction
                onClick={() => actionClick(favoritesId, index)}
                key={productId}
                options={[
                  {
                    text: '删除',
                    style: {
                      backgroundColor: '#e93b3d',
                    },
                  },
                ]}
                onOpened={() => setIsOpenedIndex(index)}
                isOpened={isOpenedIndex === index}
              >
                <View
                  className={styles['favorites-item']}
                  onClick={(e) => {
                    e.stopPropagation();
                    favoriteClick(productId, productStatus);
                  }}
                >
                  <View className={styles['img']}>
                    <ImagePreload
                      width={180}
                      height={180}
                      borderRadius={14}
                      src={img}
                    />
                  </View>
                  <View className={styles['info']}>
                    <Text className={styles['name']}>{name}</Text>
                    <Text className={styles['amount']}>
                      ¥ {transferAmount(amount, 'yuan')}
                    </Text>
                  </View>
                </View>
              </AtSwipeAction>
            </View>
          ),
        )}
      </View>
      {!data.length && (
        <View className={styles['no-favorites']}>
          <AtIcon
            prefixClass="icon"
            value="qunfengzanwudingdan"
            className={styles['no-favorites-icon']}
            size={44}
          />
          <Text className={styles['msg']}>暂无收藏记录</Text>
        </View>
      )}
    </View>
  );
};

export default favorites;
