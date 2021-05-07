<template>
<div class="form">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input  v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
            <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" prop="role">
            <el-radio-group v-model="ruleForm.role">
                <el-radio label="1" :disabled="radioStatus">管理员</el-radio>
                <el-radio label="0" :disabled="radioStatus">普通用户</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
    import utils from "../../plugins/utils";
    export default {
        data() {
            var validateUsername = (rule,value,callback)=>{
                if(!value){
                    return callback(new Error('用户名不能为空'))
                }
                setTimeout(()=>{
                    if(value.length<1){
                        callback(new Error('用户名最少要有2个字符'))
                    }else if(value.length>18){
                        callback(new Error('用户名最长不能超过18个字符'))
                    }
                    callback();
                },1000)
            }
            var validatePass = (rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请输入密码'));
                }else{
                    if (this.ruleForm.checkPass!==''){
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            }
            var validateCheckPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
            var validateEmail = (rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请输入邮箱地址'));
                }else{
                    callback();
                }
            }
            var validateRole = (rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请选定用户权限'));
                }else{
                    callback();
                }
            }
            return {
                radioStatus:false,
                ruleForm: {username:'',email:'',role:'',pass: '',checkPass: '',role:'0'},
                rules: {
                    username:[{validator:validateUsername,tigger:'blur'}],
                    email:[// {required:true,message:'请输入邮箱地址',tigger:'blur'}
                        {validator:validateEmail,tigger:'blur'}
                    ],
                    role:[
                        {validateRole:validateRole,tigger:'blur'}
                        ],
                    pass: [
                        {validator:validatePass,tigger:'blur'}
                    ],
                    checkPass: [
                        {validator:validateCheckPass,tigger:'blur'}
                    ]
                }
            };
        },
        created() {
            utils.tokenValidate(this);
            if(localStorage.getItem('role')==='user'){
                this.radioStatus=true;
            }else{
                this.radioStatus=false
            }
            axios.post('http://localhost:3000/home/signup',{
                username:'05061315',
                email:'05061315',
                password:'05061315'
            })
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let req = this.$data.ruleForm;
                        axios.post('/admin/signup', {
                            token: localStorage.getItem('token'),
                            uid: localStorage.getItem('uid'),
                            email: this.ruleForm.email,
                            password: this.ruleForm.pass,
                            username: this.ruleForm.username,
                            role: this.ruleForm.role,
                            state: '0'
                        }).then(
                            res=>{
                                console.log(res.data)
                                this.$notify({
                                    title: res.data.title,
                                    message: res.data.message,
                                    type: res.data.type
                                });
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$alert('将清空表格重新注册', '重置', {
                    confirmButtonText: '确定',
                    callback: () => {
                        this.$refs[formName].resetFields();
                        this.$message({
                            type: 'info',
                            message: '清空成功'
                        });
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .form{
        width: 500px;
    }
</style>