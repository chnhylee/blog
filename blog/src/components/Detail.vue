<template>
    <div class="detailbody" >
        <div class="article">
            <el-card>
                <el-page-header @back="goBack"></el-page-header>
                <div class="title">
                    <span style="font-family: 楷体;font-weight: bolder;width: 100%;margin: 0 auto">{{detail.title}}</span>
                </div>
                <div class="articleinfo">
                    <span style="color: #999999;margin-left: 20px">本文作者:{{detail.author}}</span>
                    <span style="color: #999999;margin-left: 20px">发表时间:{{detail.publishDate}}</span>
                </div>
                <hr/>
                <div class="content">
                    <mavon-editor defaultOpen="preview" :subfield="false" :toolbars="{}" v-model="detail.contentOri" style="z-index: 1"/>
                </div>
            </el-card>
        </div>
        <div class="comment">
            <el-card shadow="never">
                <i class="el-icon-chat-line-round"></i>
                <span style="margin-left: 10px;line-height: 10px;font-size: 1.2em;color: #32325d">评论</span>

                <div class="comment-item"  v-for="item in comments">
                    <p style="font-size:  1.3em">{{item.uid}}:</p>
                    <p style="line-height:25px;">{{item.content}}</p>
                    <div class="comment-item-time">
                        <span style="font-size: 0.6em;color: #aaa">发表于：{{item.time}}</span>
                    </div>
                </div>
            </el-card>
            <el-card style="margin-top: 10px">
                <el-input type="textarea" :autosize="{minRows:10,maxRows:100}" :rows="2" placeholder="评论内容" v-model="textarea"></el-input>
                <el-button type="primary" style="margin: 10px auto " @click="sendcomment()">发送</el-button>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Detail",
        data(){
            return{
                comments:[{uid:'',content:'',time:''},],
                detail:{},
                textarea:''
                }
            },
        created(){
            axios.post('/home/detail',{
                id:localStorage.getItem('aid')
            }).then((res)=>{
                this.detail = res.data;
            })
            axios.post('/home/commentlist',{
                id:localStorage.getItem('aid')
            }).then((res)=>{
                if(res.data.type==='error'){
                    this.comments=[];
                }else{
                    this.comments=res.data;
                }
            })
        },
        methods:{
            goBack(){
                this.$router.push('/article');
            },
            sendcomment(){
                if(localStorage.getItem('token')){
                    let username = localStorage.getItem('username');
                    this.comments.push({
                        uid:username,
                        content:this.textarea,
                        time:new Date().toLocaleTimeString()
                    })
                    axios.post('/home/commentpost',{
                        aid:localStorage.getItem('aid'),
                        uid:localStorage.getItem('uid'),
                        content:this.textarea,
                        token:localStorage.getItem('token')
                    }).then((res)=>{
                          console.log(res.data);
                        this.$message({
                            type:res.data.type,
                            message:res.data.message
                        })
                    })
                }else{
                    //反之提醒登录
                    this.$message({
                        type:'error',
                        message:'请您先登录再进行评论'
                    })
                }

            }
        }
    }
</script>

<style scoped>
    .comment-item-time{
        width: 100%;
        text-align: right;
        margin: 0 auto;
        right: 0;
    }
    .comment-item{
        border-bottom: 1px solid #eee ;
        margin-top: 0px;
        padding: 10px;
    }
    .comment{
        width: 80%;
        height: 100%;
        margin: 10px auto;
        padding: 10px 40px;

    }
    .detailbody{
        overflow: hidden;
        overflow-x: hidden;
        overflow-y: scroll;
        margin: 60px auto;
        width: 80%;
    }
    .article{
        width: 80%;
        border-radius: 10px;

        margin: 10px auto;
        padding: 10px 20px;

    }
    .title{
        text-align: center;
        width: 100%;

        font-size: 30px;
        margin: 10px auto;
    }
    .content{
        padding: 10px 0px;
        margin: 50px auto;
    }
    .articleinfo{
        /*border: 1px solid black;*/
        width: 600px;
        margin: 5px auto;
        text-align: center;
    }
</style>