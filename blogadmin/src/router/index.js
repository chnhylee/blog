import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleCreate from "../components/article/ArticleCreate";
import ArticleList from "../components/article/ArticleList";
import ArticleEdit from "../components/article/ArticleEdit"
import CommentList from "../components/article/CommentList";

import UserList from "../components/user/UserList";
import UserAdd from "../components/user/UserAdd";
import Login from "../components/Login"
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/articlecreate',
    component:ArticleCreate
  },
  {
    path:'/articleedit',
    component:ArticleEdit
  },
  {
    path:'/articlelist',
    component:ArticleList
  },
  {
    path:'/userlist',
    component:UserList
  },
  {
    path:'/useradd',
    component:UserAdd
  },
  {
    path:'/login',
    component: Login
  },
  {
    path:'/commentlist',
    component:CommentList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

