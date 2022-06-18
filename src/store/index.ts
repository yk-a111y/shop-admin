import { InjectionKey } from 'vue'
import { IUserInfo } from '@/api/types/common'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import { USER } from '@/utils/constant'

const state = {
  count: 1,
  isCollapes: false,
  user: getItem<{ token: string } & IUserInfo>(USER)
}

export type State = typeof state

export const key: InjectionKey<Store<State>> = Symbol('store')

export const store = createStore<State>({
  state,
  mutations: {
    increment (state: any) {
      state.count++
    },
    setIsCollapse (state: any, payload: any) {
      state.isCollapse = payload
    },
    setUser (state: any, payload: any) {
      state.user = payload
      setItem(USER, payload)
    }
  }
})

// 定义自己的useSore组合式函数
export function useStore () {
  return baseUseStore(key)
}
