import Taro from "@Tarojs/taro";
import { Swiper, SwiperItem, Image } from "@tarojs/components";
import { IBannerItem } from "../../interface";
import "./index.sass";
const Banner = ({ bannerList }: { bannerList: Array<IBannerItem> }) => {
  /**
   * banner点击
   * @param data
   */
  const bannerClick = (data: IBannerItem) => {
    // TODO Banner点击
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
