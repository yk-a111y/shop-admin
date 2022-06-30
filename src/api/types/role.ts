export interface IListParams {
  page: number,
  limit: number,
  role_name: string,
  status: 0 | 1 | ''
}

export interface Role {
  id: number
  role_name: string
  rules: string
  level: number
  status: 0 | 1
  statusLoading?: boolean
}

export interface EditRole {
  id: number
  level: number
  role_name: string
  rules: string
  status: 0 | 1
}

export interface Menu {
  pid: number
  id: number
  title: string
  expand: boolean
  children?: Menu[]
}

export interface RolePostData {
  role_name: string
  status: 0 | 1
  checked_menus: number[]
}
