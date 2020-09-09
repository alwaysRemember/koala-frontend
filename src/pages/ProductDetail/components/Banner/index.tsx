import {
  View,
  Video,
  Text,
  Image,
  Swiper,
  SwiperItem,
} from '@tarojs/components';
import React from 'react';
import { IBannerProps, IModuleListItem, EModuleSwitch } from './interface';
import styles from './index.module.scss';
import { useState, useEffect } from 'react';
import { setClassName } from '../../../../utils';
const Banner = ({ video, bannerList, pageLoading }: IBannerProps) => {
  const [showModule, setShowModule] = useState<EModuleSwitch>(
    EModuleSwitch.VIDEO,
  );
  const [moduleList, setModuleList] = useState<Array<IModuleListItem>>([]);

  useEffect(() => {
    setModuleList([
      {
        title: '视频',
        type: EModuleSwitch.VIDEO,
        click: () => {
          setShowModule(EModuleSwitch.VIDEO);
        },
        status: !!video.url,
      },
      {
        title: '图片',
        type: EModuleSwitch.IMG,
        click: () => {
          setShowModule(EModuleSwitch.IMG);
        },
        status: !!bannerList.length,
      },
    ]);
  }, [video, bannerList]);

  useEffect(() => {
    setShowModule(!!video.url ? EModuleSwitch.VIDEO : EModuleSwitch.IMG);
  }, [video]);

  return (
    <View
      className={setClassName([
        styles['banner-wapper'],
        pageLoading ? '' : styles['skeleton'],
      ])}
    >
      {/* video */}
      {showModule === EModuleSwitch.VIDEO ? (
        <View className={styles['video-wrapper']}>
          <Video src={video.url} className={styles['video']} />
        </View>
      ) : (
        <Swiper
          circular
          autoplay
          interval={3000}
          className={styles['img-wrapper']}
        >
          {bannerList.map((item) => (
            <SwiperItem key={item.id} className={styles['banner-item']}>
              <Image src={item.url} className={styles['banner-img']} />
            </SwiperItem>
          ))}
        </Swiper>
      )}

      {/* 模块切换 */}
      <View className={styles['module-switch']}>
        {moduleList.map((item) => (
          <View
            className={setClassName([
              styles['button'],
              (item.type === showModule && styles['on']) || '',
            ])}
            key={item.title}
            onClick={item.click}
          >
            <Text>{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Banner;
