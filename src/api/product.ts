import request from '@/utils/request'
import type { ProductListParams, ProductType, ProductCategory, Product, ProductAttrTpl, AttrRuleValue, AttrTableHeader, ProductAttr } from './types/product'

// 获取商品列表
export const getProducts = (params?: ProductListParams) => {
  return request<{
    count: number
    list: Product[]
  }>({
    method: 'GET',
    url: '/product/product',
    params
  })
}

// 获取商品类型
export const getProductTypes = () => {
  return request<{
    list: ProductType[]
  }>({
    method: 'GET',
    url: '/product/product/type_header'
  })
}

// 获取商品分类
export const getCategoryTree = (type: 0 | 1) => {
  return request<ProductCategory[]>({
    method: 'GET',
    url: `/product/category/tree/${type}`
  })
}

// 批量上下架
export const updateProductsShow = (ids: number[]) => {
  return request({
    method: 'PUT',
    url: '/product/product/product_show',
    data: {
      ids
    }
  })
}
export const updateProductsUnshow = (ids: number[]) => {
  return request({
    method: 'PUT',
    url: '/product/product/product_unshow',
    data: {
      ids
    }
  })
}

// 删除商品
export const removeProduct = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/product/product/${id}`
  })
}

// 保存新增或编辑
export const saveProduct = (id: number, data: any) => {
  return request({
    method: 'POST',
    url: `/product/product/${id}`,
    data
  })
}

// 获取商品规格模板
export const getAttrs = () => {
  return request<ProductAttrTpl[]>({
    method: 'GET',
    url: '/product/product/get_rule'
  })
}

// 生成商品属性
export const generateAttr = (id: number, type: 0 | 1, data: {
  attrs: AttrRuleValue[]
}) => {
  return request<{
    info: {
      attr: AttrRuleValue[]
      header: AttrTableHeader[]
      value: ProductAttr[]
    }
  }>({
    method: 'POST',
    url: `/product/generate_attr/${id}/${type}`,
    data
  })
}
