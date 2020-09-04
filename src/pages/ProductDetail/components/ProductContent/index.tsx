import Taro from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import '@tarojs/taro/html.css';
import ParseCom from '../../../../components/ParseCom';
const ProductContent = ({ data }: { data: string }) => {
  const [html, setHtml] = useState<string>(`<p>test</p>`);
  useEffect(() => {
    setTimeout(() => {
      console.log('change');

      setHtml(`<p>test1</p>`);
    }, 1000);
  }, []);
  {
    /* <View
      className="taro_html"
      dangerouslySetInnerHTML={{ __html: html }}
    ></View> */
  }
  return <ParseCom content={html} />;
};

export default ProductContent;
