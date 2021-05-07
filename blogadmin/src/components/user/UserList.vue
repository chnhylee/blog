<template>
    <div class="el-main">
        <div class="table">
            <el-table :data="userlist" border style="width: 100%" stripe fit height="600">
                <el-table-column prop="email" fixed label="用户邮箱" width="220"></el-table-column>
                <el-table-column prop="username" label="用户昵称" width="100"></el-table-column>
                <el-table-column prop="role" label="用户权限" width="80"></el-table-column>
                <el-table-column prop="state" label="是否封禁" width="80"></el-table-column>
                <el-table-column  prop="_id" label="用户id"></el-table-column>
                <el-table-column label="操作"  fixed="right" width="50">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <div class="page">
        </div>


        <el-dialog :title="'用户id:'+form._id" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户邮箱" :label-width="formLabelWidth" >
                    <el-input v-model="form.email" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户名称" :label-width="formLabelWidth" >
                    <el-input v-model="form.name" autocomplete="off" :placeholder="form.username"></el-input>
                </el-form-item>
                <el-form-item label="用户权限" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择用户权限">
                        <el-option label="管理员" value="admin"></el-option>
                        <el-option label="普通用户" value="user"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="帐号状态" :label-width="formLabelWidth" >
                    <el-radio v-model="radio" label="0">启用</el-radio>
                    <el-radio v-model="radio" label="1">封禁</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import utils from "../../plugins/utils";

    export default {
        methods: {
            handleClick(row) {
                this.dialogFormVisible = true
                console.log(row);
                this.form = row;
            }
        },
        created() {
                utils.tokenValidate(this);
                axios.post('/admin/userlist',{
                    token:localStorage.getItem('token'),
                    uid:localStorage.getItem('uid')
                }).then((res)=>{
                    console.log(res.data);
                    if(res.data.type==='error'){
                        this.$alert(res.data.message,res.data.title,{
                            confirmButtonText: '确定',
                            callback: () => {
                                this.$message({
                                    type: 'error',
                                    message: '请管理员登录'
                                });
                                this.$router.push('/articlelist')
                            }
                        })
                    }else{
                        this.userlist = res.data;
                    }
                })

        },
        data() {
            return {
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    _id:'',
                    email:'',
                    username: '',
                    role:'',
                    state:'',
                },
                radio:'0',
                formLabelWidth: '120px',
                userlist: [{_id: '',username: '',role: '',email:'',state:''}]
            }
        }
    }
</script>

<style scoped>
.page{
    top: 20px;
}
</style>