import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleList from '../components/ArticleList'
import Detail from '../components/Detail'
Vue.use(VueRouter)
const routes = [
  {
    path:'/',
    component: ArticleList
  },
  {
    path:'/article',
    component: ArticleList
  },
  {
    path:'/detail',
    component:Detail
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
