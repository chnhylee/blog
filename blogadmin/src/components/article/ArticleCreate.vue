<template>
    <div class="container">
        <div class="title">
            <p style="text-align: left">创建一篇新文章</p>
        </div>
        <div style="width: 100%;text-align: left">
            <el-input v-model="article.title" placeholder="请输入文章题目" style="width: 300px;text-align: left;margin-left:0;left: 0"></el-input>
            <el-button type="success" @click="publish()" style="margin: 20px 10px">发布文章</el-button>
        </div>
        <div id="main">
            <mavon-editor style="height: 500px" v-model="article.contentOri"/>
        </div>
    </div>
</template>
<script>
import marked from 'marked'
import utils from '../../plugins/utils'
    export default {
        name: "CreateArticle",
        data() {
            return {
                article:{
                    token:'',
                    title:'',
                    contentOri:'',
                    contAbstract:'',
                    uid:'',
                }
            }
        },
        methods:{
            publish(){
                if(this.article.title||this.article.contentOri){
                    axios.post('/admin/articlepost',{
                        token:localStorage.getItem('token'),
                        title:this.article.title,
                        contentOri:this.article.contentOri,
                        contentAbstract:marked(this.article.contentOri.substr(0,100)),
                        uid:localStorage.getItem('uid')
                    }).then((res)=>{
                        console.log(res.data)
                        this.$notify({
                            type:res.data.type,
                            title:res.data.title,
                            message:res.data.message
                        });
                        this.$router.push('/articlelist')
                    })
                }else{
                    this.$notify({
                        title: '提示',
                        message: '请填写完整题目与内容',
                        type: 'error'
                    });
                }

            }
        },
        created() {
            utils.tokenValidate(this);
        },

    }
</script>

<style lang="css" scoped>

</style>