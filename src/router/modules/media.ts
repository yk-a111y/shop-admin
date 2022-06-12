// src\router\modules\media.ts
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'media',
  name: 'media',
  component: () => import('@/views/media/MediaIndex.vue')
}

export default routes
