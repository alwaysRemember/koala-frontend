import React from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { IParseComProps, IParseComState } from './interface';
import WxParse from '../../utils/wxParse/wxParse';

/**
 * 渲染富文本模板
 */
export default class ParseCom extends Taro.Component<
  IParseComProps,
  IParseComState
> {
  constructor() {
    super();
    this.state = {
      nodes: null,
    };
  }

  getNodes() {
    WxParse.wxParse('content', 'html', this.props.content, this.$scope, 5);
    this.setState(prev =>
      Object.assign({}, prev, {
        nodes: this.$scope.data.content.nodes,
      }),
    );
  }

  componentDidMount() {
    this.getNodes();
  }

  componentDidUpdate() {
    this.getNodes();
  }

  render() {
    return (
      <View>
        <import src="../../utils/wxParse/wxParse.wxml" />
        <template is="wxParse" data="{{wxParseData:nodes}}" />
      </View>
    );
  }
}
