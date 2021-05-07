<template>
  <div id="app">
    <el-container>
      <el-drawer title="" :visible.sync="drawer" :direction="direction">
        <Info></Info>
      </el-drawer>
      <el-header style="padding: 0;background-color:#1677b3;position: fixed;width: 100%;z-index: 9">
        <el-button @click="drawer = true" type="primary" style="width: 100px;height: 100%">MENU</el-button>
      </el-header>
        <el-main>
          <router-view></router-view>
          <el-backtop></el-backtop>
        </el-main>
    </el-container>
  </div>
</template>
<script>
import ArticleList from './components/ArticleList.vue'
import Detail from './components/Detail.vue'
import Info from "./components/Draw/Info";
export default {
  name: 'app',
  components: {ArticleList,Detail,Info,},
  data(){
    return{
      drawer:false,
      direction: 'ltr',
    };
  },
  methods:{}
}
</script>
<style>
  #app{
    height: 100%;
    background-color: #fffef9;
    background : url("./assets/back.jpg") ;
  }
*{
  margin: 0;
  padding: 0;
}
</style>