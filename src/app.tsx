import Taro from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import store from "./store";

import Home from "./pages/Home";
import "./app.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};
App.config = {
  pages: [
    "pages/SearchPage/index",
    "pages/Global/index",
    "pages/Home/index",
    "pages/Login/index",
    "components/ParseCom/index",
    "pages/PersonalCenter/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    selectedColor: "#E93B3D",
    color: "#707070",
    list: [
      {
        pagePath: "pages/Home/index",
        text: "首页",
        iconPath: "./images/tabbar/home.png", // 35*38
        selectedIconPath: "./images/tabbar/home_selected.png"
      },
      {
        pagePath: "pages/PersonalCenter/index",
        text: "个人中心",
        iconPath: "./images/tabbar/personal_center.png",
        selectedIconPath: "./images/tabbar/personal_center_selected.png"
      }
    ]
  }
};

Taro.render(<App />, document.getElementById("app"));
