import { Swiper, SwiperItem, Image } from "@tarojs/components";
import { IBannerItem } from "../../interface";
import "./index.scss";
import { EBannerTypeEnum } from "./enums";
import { productDetailPath } from "../../../../router";

const Banner = ({ bannerList }: { bannerList: Array<IBannerItem> }) => {
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
        url = "";
    }
    if (!url) return;
    
    Taro.navigateTo({
      url
    });
  };
  return (
    <Swiper
      className="banner-wrapper"
      indicatorDots
      circular
      autoplay
      interval={2000}
      indicatorColor="#999"
      indicatorActiveColor="#333"
    >
      {bannerList &&
        bannerList.map((data: IBannerItem) => (
          <SwiperItem key={data.id} className="banner-item">
            <Image
              src={data.imgUrl}
              className="banner-img"
              onClick={() => bannerClick(data)}
            />
          </SwiperItem>
        ))}
    </Swiper>
  );
};

export default Banner;
