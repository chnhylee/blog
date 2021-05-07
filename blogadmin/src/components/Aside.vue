<template>
    <el-aside width="200px" style="background-color: rgb(255, 255, 255)">
        <el-menu :default-openeds="['0','1']" router>
            <el-submenu index="0">
                <template slot="title"><i class="el-icon-reading"></i>文章管理</template>
                <el-menu-item index="/articlecreate"><i class="el-icon-notebook-1"></i>新增文章</el-menu-item>
                <el-menu-item index="/articlelist"><i class="el-icon-notebook-2"></i>文章列表</el-menu-item>
                <el-menu-item index="/commentlist"><i class="el-icon-tickets"></i>评论管理</el-menu-item>
            </el-submenu>
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
                <el-menu-item index="/userlist"><i class="el-icon-data-line"></i>用户列表</el-menu-item>
                <el-menu-item index="/useradd" ><i class="el-icon-user"></i>新增用户</el-menu-item>
            </el-submenu>

        </el-menu>


    </el-aside>
</template>

<script>
    export default {
        name: "Aside",
        methods:{
        }
    }
</script>

<style scoped>

</style>