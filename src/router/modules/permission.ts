import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'permission',
  name: 'permission',
  component: RouterView,
  meta: {
    title: '权限'
  },
  children: [
    {
      path: 'role',
      name: 'permission_role',
      component: () => import('@/views/permission/role/RolesIndex.vue'),
      meta: {
        title: '角色'
      }
    },
    {
      path: 'admin',
      name: 'permission_admin',
      component: () => import('@/views/permission/admin/AdminIndex.vue'),
      meta: {
        title: '管理员'
      }
    },
    {
      path: 'rule',
      name: 'permission_rule',
      component: () => import('@/views/permission/rule/RuleIndex.vue'),
      meta: {
        title: '权限规则'
      }
    }
  ]
}

export default routes
