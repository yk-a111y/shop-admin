import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import productRoutes from './modules/product'
import permissionRoutes from './modules/permission'
import mediaRoutes from './modules/media'
import orderRoutes from './modules/order'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: AppLayout,
    children: [
      {
        path: '', // path留空，默认子路由
        name: 'home',
        component: () => import('@/views/home/HomeIndex.vue')
      },
      productRoutes,
      permissionRoutes,
      mediaRoutes,
      orderRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/LoginIndex.vue')
  }
]

const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  // 路由规则
  routes
})

export default router
