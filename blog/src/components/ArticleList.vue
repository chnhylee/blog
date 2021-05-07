<template>
    <div>
        <el-row style="margin: 10px 200px 40px">
            <el-col :span="24" v-for=" (item,index) in articles"  >
                <el-card :key="index" :body-style="{  width: '95%',height:'70%',margin :'10px 10px' }" class="el-card" shadow="hover" @click.native="clickcard(index)">
                    <div class="card-content">
<!--                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">-->
                        <div style="padding: 14px;">
                            <h1 class="title">{{item.title}}</h1>
                            <span style="color: #999999">作者:{{item.author}}</span>
                            <p>摘要：{{item.content}}</p>
                            <p style="text-decoration: underline ">阅读全文 »<p>
                            <div class="bottom clearfix">
                                <time class="time">{{item.publishDate}}</time>
                            </div>
                        </div>
                    </div>
                </el-card>

            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "Article",
        data(){

            return{
                articles:[
                    {
                        _id:"",
                        title:"",
                        author:"",
                        publishDate:'',
                        content:'',
                    },

                ]
            }
        },
        created(){
            axios.get('/home/index').then((res)=>{
                const articles = res.data;
                this.articles = articles;

            })
        },
        methods:{
            clickcard(index){
                this.$router.push('/detail');
                localStorage.setItem('aid',this.articles[index]._id);
            },
        }
    }
</script>
<style scoped>
    .card-content{
        /*border: 1px solid black;*/
        width: 100%;
        height: 100%;
    }
    .el-card {
        /*border: 1px solid black;*/
        background-color: white;
        margin-top: 1%;
        height: 100%;
        /*min-width: 380px;*/
        margin-right: 20px;
        transition: all .1s;
        top: 10px;
    }
    .el-card:hover{
        transform: scale(1.01);
        cursor:pointer;
    }
    div{
        /*border: 1px solid black;*/
    }
    .title{
        text-align: center;
    }
    .time {
        font-size: 13px;
        color: #999;
        width: 300px;
        display: block;
    }
    .bottom {
        margin-top: 13px;
        line-height: 12px;
        right: 0;
    }

    .image {
        width: 100%;
        display: block;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
</style>