import request from '@/utils/request'
import type { EditRole, IListParams, Menu, Role, RolePostData } from './types/role'

// 获取角色列表
export const getRoles = (params: IListParams) => {
  return request<{
    count: number,
    list: Role[]
  }>({
    method: 'GET',
    url: '/setting/role',
    params
  })
}

// 删除角色
export const deleteRole = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/setting/role/${id}`
  })
}

// 改变角色状态
export const updateRoleStatus = (id: number, status: 0 | 1) => {
  return request({
    method: 'PUT',
    url: `/setting/role/set_status/${id}/${status}`
  })
}

export const getRole = (id: number) => {
  return request<{
    role: EditRole
    menus: Menu[]
  }>({
    method: 'GET',
    url: `/setting/role/${id}/edit`
  })
}

export const getMenus = () => {
  return request<{
    menus: Menu[]
  }>({
    method: 'GET',
    url: '/setting/role/create'
  })
}

// 保存创建的角色信息
export const saveRole = (id: number, data: RolePostData) => {
  return request({
    method: 'POST',
    url: `/setting/role/${id}`,
    data
  })
}
