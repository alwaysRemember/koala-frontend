import { View, Video } from "@tarojs/components";
import { IBannerProps, IModuleListItem, EModuleSwitch } from "./interface";
import "./index.scss";
import { useState, useCallback, useEffect } from "@tarojs/taro";
import { AtButton } from "taro-ui";
const Banner = ({ video, bannerList }: IBannerProps) => {
  const [showModule, setShowModule] = useState<boolean>(false); // false = video true = banner
  const [moduleList, setModuleList] = useState<Array<IModuleListItem>>([]);

  useEffect(() => {
    setModuleList([
      {
        title: "视频",
        type: EModuleSwitch.VIDEO,
        click: () => {
          setShowModule(false);
        },
        status: !!video.url
      },
      {
        title: "图片",
        type: EModuleSwitch.IMG,
        click: () => {
          setShowModule(true);
        },
        status: !!bannerList.length
      }
    ]);
  }, [video, bannerList]);
  return (
    <View className="banner-wapper">
      {/* video */}
      {!!video.url && (
        <View className="video-wrapper">
          <Video src={video.url} className="video" />
        </View>
      )}

      {/* 模块切换 */}
      <View className="module-switch">
        {moduleList.map(item => (
          <AtButton
            key={item.title}
            size="small"
            circle={true}
            type="secondary"
            onClick={item.click}
            className="button"
          >
            {item.title}
          </AtButton>
        ))}
      </View>
    </View>
  );
};

export default Banner;
