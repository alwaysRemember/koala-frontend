/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-03 17:29:54
 * @LastEditTime: 2020-09-10 16:01:56
 * @FilePath: /koala-frontend/src/app.config.js
 */
export default {
  pages: [
    'pages/AddShoppingAddress/index',
    'pages/AddressList/index',
    'pages/Global/index',
    'pages/ProductDetail/index',
    'pages/SearchPage/index',
    'pages/PersonalCenter/index',
    'pages/OrderConfirm/index',
    'pages/Login/index',
    'pages/Home/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    selectedColor: '#E93B3D',
    color: '#707070',
    list: [
      {
        pagePath: 'pages/Home/index',
        text: '首页',
        iconPath: './images/tabbar/home.png', // 35*38
        selectedIconPath: './images/tabbar/home_selected.png',
      },
      {
        pagePath: 'pages/PersonalCenter/index',
        text: '个人中心',
        iconPath: './images/tabbar/personal_center.png',
        selectedIconPath: './images/tabbar/personal_center_selected.png',
      },
    ],
  },
};
