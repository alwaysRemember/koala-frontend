import {
  View,
  Video,
  Text,
  Image,
  Swiper,
  SwiperItem
} from "@tarojs/components";
import React from "react";
import { IBannerProps, IModuleListItem, EModuleSwitch } from "./interface";
import "./index.scss";
import { useState, useEffect } from "react";
const Banner = ({ video, bannerList }: IBannerProps) => {
  const [showModule, setShowModule] = useState<EModuleSwitch>(
    EModuleSwitch.VIDEO
  );
  const [moduleList, setModuleList] = useState<Array<IModuleListItem>>([]);

  useEffect(() => {
    setModuleList([
      {
        title: "视频",
        type: EModuleSwitch.VIDEO,
        click: () => {
          setShowModule(EModuleSwitch.VIDEO);
        },
        status: !!video.url
      },
      {
        title: "图片",
        type: EModuleSwitch.IMG,
        click: () => {
          setShowModule(EModuleSwitch.IMG);
        },
        status: !!bannerList.length
      }
    ]);
  }, [video, bannerList]);

  useEffect(() => {
    setShowModule(!!video.url ? EModuleSwitch.VIDEO : EModuleSwitch.IMG);
  }, [video]);

  return (
    <View className="banner-wapper">
      {/* video */}
      {showModule === EModuleSwitch.VIDEO ? (
        <View className="video-wrapper">
          <Video src={video.url} className="video" />
        </View>
      ) : (
        <Swiper
          circular
          autoplay
          interval={3000}
          className="img-wrapper"
        >
          {bannerList.map(item => (
            <SwiperItem key={item.id} className="banner-item">
              <Image src={item.url} className="banner-img" />
            </SwiperItem>
          ))}
        </Swiper>
      )}

      {/* 模块切换 */}
      <View className="module-switch">
        {moduleList.map(item => (
          <View
            className={`button ${item.type === showModule ? "on" : ""}`}
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
