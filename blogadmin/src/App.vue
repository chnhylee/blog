<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <Aside></Aside>
            </el-aside>
            <el-container>
                <el-header>
                <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-submenu index="2" class="el-submenu">
                        <template slot="title" ><a href="http://127.0.0.1:8080/login">{{user.username?user.username:'您好，请登录'}}</a></template>
                        <el-menu-item index="2-1" @click="info">个人资料</el-menu-item>
                        <el-menu-item index="2-2" @click="logout">退出登录</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Aside from './components/Aside'
import Login from "./components/Login";
export default {

    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            user:{
                username:localStorage.getItem('username'),
                state:0,
                role:'user'
            }
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        info(){
            console.log('个人信息')
        },
        login(){
            console.log('登录')
        },
        logout(){
            console.log('退出登录');
            localStorage.clear();
            this.$router.push('/login');
            this.user.username='';
        }
    },

  name: 'app',
  components: {
  Aside,Login
  },
    created(){
        var timer = setInterval(()=>{
            this.user.username=localStorage.getItem('username');
            if (this.user.username){
                clearInterval(timer);
            };
        },1000);
    }
}
</script>

<style>
    a{
        text-decoration: none;
        color:#FFFFFF ;
    }
  .el-aside {
    background-color: #FFF;
    color: #333;
    text-align: center;
    line-height: 200px;
      height: 100%;
  }

  .el-main {
    background-color: #FFF;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  .el-menu-demo{
      /*position: relative;*/
      width: 100%;
  }
.el-submenu{
    /*position: absolute;*/
    /*right: 0;*/

}
</style>
