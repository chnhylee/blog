<template>
    <div class="container">
        <div class="title">
            <p style="text-align: left">编辑文章</p>
        </div>
        <div style="width: 100%;text-align: left">
            <el-input v-model="this.article.title" placeholder=""  style="width: 300px;text-align: left;margin-left:0;left: 0"></el-input>
            <el-button type="primary" @click="publish()" style="margin: 20px 10px">重新发布</el-button>
        </div>

        <div id="main">
            <mavon-editor v-model="article.contentOri"/>
        </div>
    </div>

</template>


<script>
    import Common from '../../plugins/utils.js'
    import utils from "../../plugins/utils";
    export default {
        name: "EditArticle",
        data() {
            return {
                article:{
                    token:'',
                    title:'',
                    contentOri:'',

                },
                message:'确认更新文章？',
                articlePublishFun:async function(){
                    //-------------------------------------
                    //文章更新上传
                    let responseInfo = {};
                    await axios.post('/articleedit',this.article).then(res=>{
                        return responseInfo=res.data;
                    })
                    return responseInfo;
                    //结束
                    //-------------------------------------
                }
            }
        },
        methods:{
            articleEdit(){

            },
            publish(){

                Common.openNode(this);
                console.log(this.article.contentOri)


            }
        },
        created() {
            utils.tokenValidate(this);
            this.article.title = localStorage.getItem('title');
            this.article.contentOri = localStorage.getItem('content');
        }
    }
</script>


<style scoped>
    #main{
        height: 600px;
        overflow: auto;
    }
</style>