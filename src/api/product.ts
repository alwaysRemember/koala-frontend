import { IProductDetailResponse } from "src/pages/ProductDetail/interface";
import { request } from "src/request";

/**
 * 获取产品详情
 * @param params
 */
export const getProductDetail = (params: { productId: string }) =>
  request<IProductDetailResponse>({
    url: "/product/get-product-detail",
    params,
    method: "GET"
  });
