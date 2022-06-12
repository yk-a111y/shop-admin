import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'

export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol('store')

export const store = createStore<State>({
  state () {
    return {
      count: 1
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
