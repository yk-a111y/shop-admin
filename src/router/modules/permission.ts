import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'permission',
  name: 'permission',
  component: RouterView,
  children: [
    {
      path: 'role',
      name: 'permission_role',
      component: () => import('@/views/permission/role/RolesIndex.vue')
    },
    {
      path: 'admin',
      name: 'permission_admin',
      component: () => import('@/views/permission/admin/AdminIndex.vue')
    },
    {
      path: 'rule',
      name: 'permission_rule',
      component: () => import('@/views/permission/rule/RuleIndex.vue')
    }
  ]
}

export default routes
