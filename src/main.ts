import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
// 加载全局样式
import './styles/index.scss'
// 加载组件库
import elementPlus from './plugins/element-plus'

createApp(App)
  .use(router)
  .use(store, key)
  .use(elementPlus)
  .mount('#app')
