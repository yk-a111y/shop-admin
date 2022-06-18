// src\router\modules\order.ts

import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/order',
  name: 'order',
  component: RouterView,
  meta: {
    title: '订单'
  },
  children: [
    {
      path: 'list',
      name: 'order_list',
      component: () => import('@/views/order/list/ListIndex.vue'),
      meta: {
        title: '订单列表'
      }
    },
    {
      path: 'offline',
      name: 'order-offline',
      component: () => import('@/views/order/offline/OfflineIndex.vue'),
      meta: {
        title: '商品列表'
      }
    }
  ]
}

export default routes
