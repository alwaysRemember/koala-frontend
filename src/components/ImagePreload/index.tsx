import React, { useState, useEffect } from 'react';
import Taro, { pxTransform } from '@tarojs/taro';
import { IImagePreload } from './interface';
import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';
import { setClassName } from '../../utils';
import { AtIcon } from 'taro-ui';

/* 图片预加载 */
const ImagePreload = ({ src, width, height }: IImagePreload) => {
  const [isLoad, setIsLoad] = useState<boolean>(false); // 是否加载成功
  const [isError, setIsError] = useState<boolean>(false); // 是否加载失败

  useEffect(() => {}, []);
  return (
    <View className={styles['image-preload-wrapper']}>
      {(!isLoad || isError) && (
        <View
          className={styles['image-preload']}
          style={{
            width: pxTransform(width),
            height: pxTransform(height),
          }}
        >
          {(isError && (
            <AtIcon
              prefixClass="icon"
              value="tupianjiazaishibai"
              className={styles['icon']}
            />
          )) || (
            <AtIcon
              value="loading-2"
              className={setClassName([styles['icon'], styles['loading-icon']])}
            />
          )}
        </View>
      )}

      <Image
        src={src}
        mode="widthFix"
        lazyLoad
        className={styles['image']}
        onLoad={() => {
          setIsLoad(true);
        }}
        onError={() => {
          setIsError(true);
        }}
      />
    </View>
  );
};

export default ImagePreload;
