import { View, Video,Text } from "@tarojs/components";
import { IBannerProps, IModuleListItem, EModuleSwitch } from "./interface";
import "./index.scss";
import { useState, useEffect } from "@tarojs/taro";
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
          <View className="button" key={item.title} onClick={item.click}>
            <Text>{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Banner;
