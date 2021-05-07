<template>
    <div id="commentList">
        <el-table :data="comment" stripe border height="600" style="width: 100%" :default-sort="{prop:'time',order:'descending'}">
            <el-table-column fixed prop="time" label="发表日期" width="220" sortable></el-table-column>
            <el-table-column prop="uid" label="发表者邮箱" width="180" sortable></el-table-column>
            <el-table-column show-overflow-tooltip prop="aid" label="文章标题" width="220" sortable></el-table-column>
            <el-table-column prop="content" show-overflow-tooltip label="评论内容" sortable></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="info" size="small">查看</el-button>
                    <el-button @click="deleteClick(scope.row)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import utils from "../../plugins/utils";
    export default {
        name: "CommentList",
        methods: {
            //查看按钮的功能
            handleClick(row) {
                console.log(row);
                const h = this.$createElement;
                this.$msgbox({
                    title:'评论详情',
                    message:h('div', {style:'line-height:35px'},[
                        h('span', {style:'font-weight: bold;'},'发表时间:'),
                        h('span', {style:'margin-left:10px'},row.time),
                        h('p', {style:''},''),

                        h('span', {style:'font-weight: bold;'},'发表者邮箱:'),
                        h('span', {style:'margin-left:10px'},row.uid),
                        h('p', {style:''},''),

                        h('span', {style:'font-weight: bold;'},'文章标题:'),
                        h('span', {style:'margin-left:10px'},"《"+row.aid+"》"),

                        h('p',{style:'font-weight: bold;'},'评论内容: '),
                        h('p',{style:'text-indent:2em;overflow:auto'},row.content)
                    ]),
                    confirmButtonText: '确定',
                    customClass:'msgbox'
                })
            },
            //删除按钮的功能
            deleteClick(row){
                this.$confirm('您将删除一条评论，是否确认','提示',{
                    confirmButtonText:'删除',
                    cancelButtonText:'取消',
                    type:'warning',
                    beforeClose:(action,instance,done)=>{
                        if(action==='confirm'){
                            instance.confirmButtonLoading=true
                            instance.confirmButtonText='执行中...';
                            setTimeout(()=>{
                                // this.comment.pop(row);
                                this.comment.splice(this.comment.indexOf(row),1);
                                done();
                                setTimeout(()=>{
                                    instance.confirmButtonLoading=false;
                                },50)
                            },100);
                        }else{
                            done();
                        }
                    }
                }).then(()=>{
                    this.$message({
                        type:"success",
                        message:"删除一条评论"
                    });
                }).catch(()=>{
                    this.$message({
                        type:"info",
                        message:"已取消删除"
                    });
                })
                console.log(row);
            }
        },
        created() {
            utils.tokenValidate(this);
            axios.post('/admin/commentlist',{
                token:localStorage.getItem('token'),
                uid:localStorage.getItem('uid')
            }).then(res=>{
                this.comment =res.data;
            })
        },
        data() {
            return {
                comment: [{time: '',uid:'',aid:'',content:'',}]
            }
        }
    }
</script>
<style>
    .el-tooltip__popper{
        font-size: 14px;
        max-width: 50%;
        line-height: 1.3em;
    }
    .msgbox{
        width: auto;
        min-width: 150px;
        max-width: 650px;
    }
</style>