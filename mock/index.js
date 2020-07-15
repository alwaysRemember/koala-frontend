/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-23 16:54:12
 * @LastEditTime: 2020-07-15 11:39:59
 * @FilePath: /koala-frontend/mock/index.js
 */

const delay = cb => setTimeout(cb, 2000);

const responseData = data => ({
  code: 0,
  data,
  message: "成功"
});

const testImg =
  "https://wx.qlogo.cn/mmopen/vi_32/7icYslR11jBbaGjm6LAXib6VRxEuibQiagia2LicNPJEgbTacD2SH8dSauGD6Cp9ggicA1tmY3foDwL5NibwZv6F1SI7Vg/132";
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
          avatarUrl: testImg,
          code: "043LPqIq0z7kpl1ibrJq0UTjIq0LPqI2",
          openid: "oIPp75dQIJJrHUqK1gBmfJoQZvo8",
          sessionKey: "pkloNmPXy02QrT2uhL8kuw=="
        })
      );
    });
  },
  "GET /front/home": (req, res) => {
    delay(() => {
      res.json(
        responseData({
          bannerList: [
            {
              id: 1,
              imgUrl: testImg,
              path: ""
            },
            {
              id: 2,
              imgUrl: testImg,
              path: ""
            }
          ],
          showCategoriesMore: true,
          categoriesList: [
            {
              id: 1,
              categoriesName: "苹果",
              categoriesIconUrl: testImg,
            },
            {
              id: 2,
              categoriesName: "苹果苹果苹果",
              categoriesIconUrl: testImg,
            },
            {
              id: 3,
              categoriesName: "苹果",
              categoriesIconUrl: testImg,
            },
            {
              id: 4,
              categoriesName: "苹果",
              categoriesIconUrl: testImg,
            },
            {
              id: 5,
              categoriesName: "苹果",
              categoriesIconUrl: testImg,
            },
            {
              id: 6,
              categoriesName: "苹果",
              categoriesIconUrl: testImg,
            },
            {
              id: 7,
              categoriesName: "苹果",
              categoriesIconUrl: testImg,
            }
          ],
          featuredList: [
            {
              id: 1,
              logo: testImg,
              name: "轻质方形男式墨镜",
              introduction:
                "Fendi制造商，偏光镜片。目前盛夏炎 ,Fendi制造商，偏光镜片。目前盛夏炎",
              amount: 2599
            },
            {
              id: 2,
              logo: testImg,
              name: "轻质方形男式墨镜",
              introduction:
                "Fendi制造商，偏光镜片。目前盛夏炎 ,Fendi制造商，偏光镜片。目前盛夏炎",
              amount: 2599
            }
          ]
        })
      );
    });
  }
};
