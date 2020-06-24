/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-23 16:54:12
 * @LastEditTime: 2020-06-23 16:56:42
 * @FilePath: /koala-frontend/mock/index.js
 */

const delay = cb => setTimeout(cb, 2000);

const responseData = data => ({
  code: 0,
  data,
  message: "成功"
});

module.exports = {
  "POST /front/login": (req, res) => {
    delay(() => {
      res.json(
        responseData({
          nickName: "always。",
          gender: 1,
          language: "zh_CN",
          city: "Pudong New District",
          province: "Shanghai",
          country: "China",
          avatarUrl:
            "https://wx.qlogo.cn/mmopen/vi_32/7icYslR11jBbaGjm6LAXib6VRxEuibQiagia2LicNPJEgbTacD2SH8dSauGD6Cp9ggicA1tmY3foDwL5NibwZv6F1SI7Vg/132",
          code: "043LPqIq0z7kpl1ibrJq0UTjIq0LPqI2",
          openid: "oIPp75dQIJJrHUqK1gBmfJoQZvo8",
          sessionKey: "pkloNmPXy02QrT2uhL8kuw=="
        })
      );
    });
  }
};
