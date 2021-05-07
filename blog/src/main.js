import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import dateformat from 'dateformat'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
Vue.config.productionTip = false

Vue.use(mavonEditor)
axios.defaults.baseURL='http://47.96.249.104:3000'
Vue.prototype.$markDown = mavonEditor.markdownIt
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
