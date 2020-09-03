/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-23 16:54:12
 * @LastEditTime: 2020-09-03 15:46:18
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
  "POST /api/front/login": (req, res) => {
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
  "GET /api/front/home/get-home-data": (req, res) => {
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
              categoriesIconUrl: testImg
            },
            {
              id: 2,
              categoriesName: "苹果苹果苹果",
              categoriesIconUrl: testImg
            },
            {
              id: 3,
              categoriesName: "苹果",
              categoriesIconUrl: testImg
            },
            {
              id: 4,
              categoriesName: "苹果",
              categoriesIconUrl: testImg
            },
            {
              id: 5,
              categoriesName: "苹果",
              categoriesIconUrl: testImg
            },
            {
              id: 6,
              categoriesName: "苹果",
              categoriesIconUrl: testImg
            },
            {
              id: 7,
              categoriesName: "苹果",
              categoriesIconUrl: testImg
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
  },
  "POST /api/front/product/get-product-detail": (req, res) => {
    delay(() => {
      res.json(
        responseData({
          productId: "9d3e5e9a-dc99-47ce-8520-63c4c937b44d",
          productVideo: {
            id: "02de7a46-d3f5-45f2-b668-20bc528d2e5d",
            url:
              "http://localhost:8080/video/1596019464253_1593603850438133.mp4"
          },
          productBanner: [
            {
              id: "3dd88761-896d-40e2-853f-97009f6bb797",
              url: "http://localhost:8080/image/1596081904945_apple.jpg"
            }
          ],
          productAmount: 123123,
          productName: "test",
          productStatus: "PUT_ON_SHELF",
          productType: true,
          productBrief: "123123asd",
          productContent: "<p>123123</p><p>是大是大非</p>",
          productParameter: [
            {
              key: "test",
              value: "value_1"
            }
          ],
          productConfigList: [
            {
              id: 5,
              categoryName: "颜色",
              name: "红色",
              amount: 1000
            },
            {
              id: 8,
              categoryName: "颜色",
              name: "绿2色",
              amount: 100
            },
            {
              id: 16,
              categoryName: "尺寸",
              name: "XL",
              amount: 0
            }
          ],
          productDeliveryCity: "黑龙江省,黑河市",
          productSales: 100,
          productShipping: 1000,
          productFavorites: false
        })
      );
    });
  }
};
