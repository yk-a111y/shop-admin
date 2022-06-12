import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'product',
  name: 'product',
  component: RouterView,
  children: [
    {
      path: 'product_list',
      name: 'product_list',
      component: () => import('@/views/product/list/ListIndex.vue')
    },
    {
      path: 'product_classify',
      name: 'product_classify',
      component: () => import('@/views/product/classify/ClassifyIndex.vue')
    },
    {
      path: 'product_attr',
      name: 'product_attr',
      component: () => import('@/views/product/attr/AttrIndex.vue')
    },
    {
      path: 'product_reply',
      name: 'product_reply',
      component: () => import('@/views/product/reply/ReplyIndex.vue')
    }
  ]
}

export default routes
