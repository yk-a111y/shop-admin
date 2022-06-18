import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import productRoutes from './modules/product'
import permissionRoutes from './modules/permission'
import mediaRoutes from './modules/media'
import orderRoutes from './modules/order'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { store } from '@/store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: AppLayout,
    meta: { // 自定义元数据，用于匹配面包屑导航
      title: '首页',
      requireAuth: true
    },
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

router.beforeEach((to, from) => {
  // 页面的加载进度条
  nprogress.start()
  // 路由前置导航检查访问是否需要登录授权
  if (to.meta.requireAuth && !store.state.user) {
    return {
      path: '/login',
      query: {
        redirectPath: to.fullPath // 记录路由以便登录后跳回到该界面
      }
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})

export default router
