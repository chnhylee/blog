<template>
    <div class="el-main">
        <div class="table">
        <el-table :data="articlelist" border style="width: 100%" stripe fit height="600" :default-sort="{prop:'publishDate',order:'descending'}">
            <el-table-column  prop="publishDate" label="发布日期" width="160" sortable></el-table-column>
            <el-table-column prop="title" label="文章标题" show-overflow-tooltip width="220" sortable></el-table-column>
            <el-table-column prop="content" show-overflow-tooltip label="摘要" sortable></el-table-column>
            <el-table-column prop="author" label="作者" width="120" sortable></el-table-column>
            <el-table-column prop="_id" label="文章编号" width="220" sortable></el-table-column>
            <el-table-column label="操作"  fixed="right" width="150">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
                    <el-button @click="deleteClick(scope.row)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>
    </div>
</template>

<script>
    import utils from "../../plugins/utils";
    export default {
        methods: {
            handleClick(row) {
                console.log(row);
                axios.post('/home/detail',{id:row._id}).then((res)=>{
                    console.log(res.data);
                    localStorage.setItem('title',res.data.title);
                    localStorage.setItem('content',res.data.contentOri);
                    this.$router.push('/articleedit')
                })
            },
            deleteClick(row){
                //删除一行数据
                let articleId = row._id;
                this.$confirm('您将删除一篇文章，是否确认','提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(()=>{
                    axios.post('/admin/articledrop',{
                        token:localStorage.getItem('token'),
                        uid:localStorage.getItem('uid'),
                        id:row._id
                    }).then((res)=>{
                        console.log(res.data)
                        this.articlelist.splice(this.articlelist.indexOf(row),1);
                    });
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    });
                }).catch(()=>{
                    this.$message({
                        type:'info',
                        message:'已取消删除'
                    });
                });
            }
        },
        created(){
            utils.tokenValidate(this);
            axios.post('/admin/articlelist',{token:localStorage.getItem('token')}).then((res)=>{
                this.articlelist = res.data;
                return console.log(res.data)
            })
        },
        data() {
            return {
                articlelist:[{
                        publishDate:'',
                        title:'',
                        content:'',
                        author:'',
                        _id:''
                }]
            }
        }
    }
</script>


<style scoped>
    .page{
        left: 50%;
        transform: translateX(-200px);
        margin: 0 auto;
        position: fixed;
        bottom: 0;
    }
    .el-tooltip__popper{
        font-size: 14px;
        max-width: 50%;
        line-height: 1.3em;
    }
</style>