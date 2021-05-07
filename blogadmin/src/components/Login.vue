<template>
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
</el-form>
</template>

<script>
    export default {
        data() {
            var checkEmail = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('邮箱不能为空'));
                }
                setTimeout(() => {
                    callback();
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            return {
                ruleForm: {email: '',pass: ''},
                rules: {
                    pass: [{ validator: validatePass, trigger: 'blur' }],
                    email: [{ validator: checkEmail, trigger: 'blur' }]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.ruleForm.email,this.ruleForm.pass);
                        axios.post('/home/signin',{
                            email:this.ruleForm.email,
                            password:this.ruleForm.pass,
                        }).then((res)=>{
                            this.$alert(res.data.info.message,res.data.info.title,{
                                confirmButtonText:'确定',
                                callback:()=>{
                                    if(res.data.info.type==='success'){
                                        localStorage.setItem('token',res.data.token);
                                        localStorage.setItem('username',res.data.username);
                                        localStorage.setItem('uid',res.data.uid);
                                        localStorage.setItem('role',res.data.role);
                                        this.$router.push('/articlecreate');
                                        this.$router.go(0);
                                    }

                                }
                            })
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>