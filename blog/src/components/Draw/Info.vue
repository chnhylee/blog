<template>
    <div style="background-color: #c7d2d4;padding: 30px 20px;">
    <el-row class="demo-avatar demo-basic">
        <el-col :span="24">
            <div class="demo-basic--circle" style="margin-left: 150px">
                <div class="block"><el-avatar :size="100" :src="circleUrl"></el-avatar></div>
            </div>
            <p style="margin-left: 60px;margin-top: 20px;font-size: 20px;line-height: 20px" v-if="defaultuserinfo" v-model="username"></p>
            <p v-if="logoutButton">{{username}}</p>
            <el-row style="margin: 40px auto;width: 100%;padding: 10px;text-align: center">
                <el-button type="primary"  round style="font-size: 18px;margin-right:30px;"@click="signinVisible = true" v-if="signInButton">登 录</el-button>
                <el-button type="danger"  round style="font-size: 18px;margin-right:30px;"@click="logout()" v-if="logoutButton">退 出</el-button>
                <el-button type="primary"  round style="font-size: 18px;margin-left:30px;"@click="signupVisible = true">注 册</el-button>
            </el-row>
        </el-col>
    </el-row>
    <el-dialog title="用户登录" :visible.sync="signinVisible" append-to-body>
            <el-form :model="formSignUp">
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="formSignIn.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="formSignIn.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="signinVisible = false">取 消</el-button>
                <el-button type="primary" @click="signin()">登 录</el-button>
            </div>
        </el-dialog>

    <el-dialog title="创建用户" :visible.sync="signupVisible" append-to-body>
            <el-form :model="formSignUp" ref="formSignUp" :rules="rules">
                <el-form-item label="邮箱地址" prop="email" :label-width="formLabelWidth">
                    <el-input v-model="formSignUp.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
                    <el-input v-model="formSignUp.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                    <el-input type="password" v-model="formSignUp.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码"   prop="checkPass" :label-width="formLabelWidth">
                    <el-input type="password" v-model="formSignUp.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户权限" :label-width="formLabelWidth" >
                    <el-select v-model="formSignUp.role" placeholder="普通用户" disabled>
                        <el-option label="管理员" value="admin"></el-option>
                        <el-option label="普通用户" value="user"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="signupVisible=false">取 消</el-button>
                <el-button type="primary" @click="signup('formSignUp')">注册</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data () {
            var ValidateUser = (rule,value,callback)=>{
                if(!value){
                    return callback(new Error('用户名不能为空'));
                }
                setTimeout(()=>{
                    callback();
                },1000);
            }
            var ValidateEmail = (rule,value,callback)=>{
                if(!value){
                    return callback(new Error('邮箱不能为空'));
                }
                setTimeout(()=>{
                        callback();
                },1000);
            };
            var validatePass = (rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请输入密码'));
                }else{
                    if(this.formSignUp.checkPass!==''){
                    }
                    callback();
                }
            }
            var validatePass2 = (rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请再次输入密码'));
                }else if(value!==this.formSignUp.password){
                    callback(new Error('两次输入密码不一致'));
                }else{
                    callback();
                }
            }
            return {
                rules:{
                  username:[{validator:ValidateUser,trigger:'blur'}],
                  email:[{validator:ValidateEmail,trigger:'blur'}],
                  pass:[{validator:validatePass,trigger: 'blur'}],
                  checkPass:[{validator:validatePass2,trigger:'blur'}]
                },
                username:'您好，请登录',
                signinVisible: false,
                signupVisible: false,
                signInButton:true,
                logoutButton:false,
                defaultuserinfo:true,
                formSignIn: {
                    email: '',
                    password:'',
                },
                formSignUp: {email: '',username: '',password:'',checkPass:'',role: 'user'},
                formLabelWidth: '120px',
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            }
        },
        created() {
            if(localStorage.getItem('token')){
                this.logoutButton=true;
                this.signInButton=false;
                this.username=localStorage.getItem('username');
            }

        },
        methods:{
            signup(formName){
                console.log(formName);
                this.$refs[formName].validate((valid)=>{
                    if (valid){
                        //注册请求
                        let req =this.$data.formSignUp;
                        console.log(req);
                        axios.post('/home/signup',{
                            email:this.formSignUp.email,
                            username:this.formSignUp.username,
                            password:this.formSignUp.checkPass,
                        }).then((res)=>{
                            console.log(res.data);
                            if(res.data.type==='success'){
                                this.signupVisible = false;
                            }
                            this.$message({
                                message: res.data.message,
                                type: res.data.type
                        });

                        })
                    }else{
                        this.$message({
                            message:'请按要求填写表格',
                            type:'error'
                        })
                        return false;
                    }
                });
            },
            signin(){
                axios.post('/home/signin',{
                    email:this.formSignIn.email,
                    password:this.formSignIn.password
                }).then((res)=>{
                    if(res.data.info.type==='success'){
                        localStorage.setItem('token',res.data.token);
                        localStorage.setItem('uid',res.data.uid);
                        localStorage.setItem('username',res.data.username);
                        this.$message({type:'success',message:`${res.data.info.message}`});
                        this.logoutButton = true;
                        this.signInButton = false;
                        this.defaultuserinfo = false
                        this.username='当前用户: '+res.data.username;
                    }else{this.$message({type:'error',message:`${res.data.info.message}`})
                    }
                })
                this.signinVisible = false
            },
            logout(){
                localStorage.clear();
                this.$message({
                  type:'info',
                  message:`退出用户`
              })
                this.logoutButton = false;
                this.signInButton = true;
                this.defaultuserinfo=true;
                this.username='您好，请登录';
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
                this.signupVisible = false
            }
        }

    }
</script>


<style scoped>
</style>