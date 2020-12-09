import React from 'react';
import { Swiper, SwiperItem, Image, View } from '@tarojs/components';
import { IBannerItem } from '../../interface';
import styles from './index.module.scss';
import { EBannerTypeEnum } from './enums';
import { productDetailPath } from '../../../../router';
import ImagePreload from '../../../../components/ImagePreload';

const Banner = ({
  bannerList,
  checkLogin,
}: {
  bannerList: Array<IBannerItem>;
  checkLogin: (cb) => void;
}) => {
  /**
   * banner点击
   * @param data
   */
  const bannerClick = ({ type, productId }: IBannerItem) => {
    let url: string;
    switch (type) {
      case EBannerTypeEnum.PRODUCT:
        url = productDetailPath({ productId: productId as string });
        break;
      default:
        url = '';
    }
    if (!url) return;

    Taro.navigateTo({
      url,
    });
  };
  return (
    <Swiper
      className={styles['banner-wrapper']}
      indicatorDots
      circular
      autoplay
      interval={2000}
      indicatorColor="#999"
      indicatorActiveColor="#333"
    >
      {bannerList &&
        bannerList.map((data: IBannerItem) => (
          <SwiperItem key={data.id} className={styles['banner-item']}>
            <View
              className={styles['banner-img']}
              onClick={() =>
                checkLogin(() => {
                  bannerClick(data);
                })
              }
            >
              <ImagePreload width={750} height={340} src={data.imgUrl} />
            </View>
            {/* <Image
              src={data.imgUrl}
              className={styles['banner-img']}
              onClick={() => bannerClick(data)}
            /> */}
          </SwiperItem>
        ))}
    </Swiper>
  );
};

export default Banner;
