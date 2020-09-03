import React from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";
const HomeSkeleton = () => {
  return (
    <View className="home-skeleton">
      <View className="banner" />
      <View className="classification-wrapper">
        {[...Array(8).keys()].map((item: number) => (
          <View className="classification-item" key={item}>
            <View className="icon" />
            <Text className="skeleton-classification-item-text name" />
          </View>
        ))}
      </View>
      <View className="featured-wrapper">
        <Text className="featured-title">精选推荐</Text>
        <View className="featured-product-item">
          <View className="logo skeleton-featured-item-logo" />
          <View className="featured-product-info">
            <View className="product-name skeleton-featured-item-product-name" />
            <View className="product-introduction skeleton-featured-item-product-name" />
            <View className="product-amount-wrapper  skeleton-featured-item-product-name" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeSkeleton;
