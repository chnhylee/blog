import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Common from './plugins/utils'
Vue.config.productionTip = false
Vue.use(mavonEditor)
axios.defaults.baseURL='http://47.96.249.104:3000'

new Vue({
  Common,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
