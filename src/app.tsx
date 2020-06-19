import Taro, { Component, Config } from "@tarojs/taro";

import Home from "./pages/Home";
import 'taro-ui/dist/style/index.scss'

class App extends Component {
  config: Config = {
    pages: ["pages/Home/index", "pages/PersonalCenter/index"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      selectedColor: "#30C200",
      color: "#707070",
      list: [
        {
          pagePath: "pages/Home/index",
          text: "首页",
          iconPath: "./images/tabbar/home.png", // height 38
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

  render() {
    return <Home />;
  }
}

Taro.render(<App />, document.getElementById("app"));
