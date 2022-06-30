import request from '@/utils/request'
import { IListParams, Admin, AdminPostData } from './types/admin'
import { IFormData } from './types/form'

// 获取管理员信息
export const getAdmins = (params: IListParams) => {
  return request<{
    count: number,
    list: Admin[]
  }>({
    method: 'GET',
    url: '/setting/admin',
    params
  })
}

// 删除管理员
export const deleteAdmin = (id: number) => {
  return request<{
    status: number,
    msg: string
  }>({
    method: 'DELETE',
    url: `/setting/admin/${id}`
  })
}

// 修改管理员状态
export const updateAdminStatus = (id: number, status: number) => {
  return request<{
    status?: number,
    msg?: string
  }>({
    method: 'PUT',
    url: `setting/set_status/${id}/${status}`
  })
}

// 获取角色信息
export const getRoles = () => {
  return request<IFormData>({
    method: 'GET',
    url: '/setting/admin/create'
  }).then(data => {
    const roles = data.rules.find(item => item.field === 'roles')
    if (roles && roles.options) {
      return roles.options
    }
    return []
  })
}

// 编辑管理员信息
export const getAdmin = (id: number) => {
  return request<IFormData>({
    method: 'GET',
    url: `/setting/admin/${id}/edit`
  }).then(data => {
    const obj: Record<string, any> = {}
    data.rules.forEach(item => {
      obj[item.field] = item.value
    })
    return obj as AdminPostData
  })
}

// 表单提交-编辑管理员
export const updateAdmin = (id: number, data: AdminPostData) => {
  return request({
    method: 'PUT',
    url: `/setting/admin/${id}`,
    data
  })
}

// 表单提交-添加管理员
export const createAdmin = (data: AdminPostData) => {
  return request({
    method: 'POST',
    url: '/setting/admin',
    data
  })
}
