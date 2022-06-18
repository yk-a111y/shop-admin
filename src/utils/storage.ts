// 封装localStorage本地存储模块

// 设置本地存储字段
export const setItem = (key: string, value: object | string | null) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取本地存储字段
export const getItem = <T>(key: string): T | null => {
  const data = window.localStorage.getItem(key)
  if (!data) return null
  try {
    return JSON.parse(data) as T // 将JSON.parse返回值类型设为T，作为函数的泛型
  } catch (e) {
    return null
  }
}

// 删除本地存储字段
export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}
