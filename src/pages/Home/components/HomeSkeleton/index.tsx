import React from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.scss";
import classStyles from "../Classification/index.module.scss";
import featuredStyles from "../Featured/index.module.scss";
import { setClassName } from "../../../../utils";

const HomeSkeleton = () => {
  return (
    <View className={styles["home-skeleton"]}>
      <View className={styles["banner"]} />
      <View className={classStyles["classification-wrapper"]}>
        {[...Array(8).keys()].map((item: number) => (
          <View className={classStyles["classification-item"]} key={item}>
            <View className={classStyles["icon"]} />
            <Text
              className={
                setClassName([styles["skeleton-classification-item-text"],classStyles["name"]])
                }
            />
          </View>
        ))}
      </View>
      <View className={featuredStyles["featured-wrapper"]}>
        <Text className={featuredStyles["featured-title"]}>精选推荐</Text>
        <View className={featuredStyles["featured-product-item"]}>
          <View
            className={setClassName([
              featuredStyles["logo"],
              styles["skeleton-featured-item-logo"],
            ])}
          />
          <View className={featuredStyles["featured-product-info"]}>
            <View
              className={setClassName([
                featuredStyles["product-name"],
                styles["skeleton-featured-item-product-name"],
              ])}
            />
            <View
              className={setClassName([
                featuredStyles["product-introduction"],
                styles["skeleton-featured-item-product-name"],
              ])}
            />
            <View
              className={setClassName([
                featuredStyles["product-amount-wrapper"],
                styles["skeleton-featured-item-product-name"],
              ])}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeSkeleton;
