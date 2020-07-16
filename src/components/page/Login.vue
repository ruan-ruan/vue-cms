<template>
	<div>
	<el-row class='nav-header'>
		<el-col :span='15'align='center'>后台加速系统</el-col>
		<el-col :span='4' align='right'>语言选择</el-col>
		<el-col :span='2' align='right'>操作指南</el-col>
		<el-col :span='3' align='center'>联系电话</el-col>
	</el-row>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台加速系统</div>
            <el-form :model="param" :rules="rules" ref="param" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
   	</div>
</template>

<script>
	import axios from 'axios'
export default {
    data: function() {
        return {
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
            info:{}
        };
    },
    methods: {
        submitForm() {
            this.$refs.param.validate(valid => {
                if (valid) {
                	var data={
                		name:this.param.username,
                		pass:this.param.password
                	};
                	this.$http.post('/login/login',data)
                	.then(res => {
                		if(res.status == 200){
                			if(res.data.status == 0){
                				var str=res.data.data;
                				this.$store.commit('cToken',str['c-token']);
                				this.$store.commit('authkey',str['authkey']);
                				this.$store.commit('menu',str['menu']);
                				this.$store.commit('privileges',str['privileges']);
                				this.$store.commit('info',str['info']);
                				this.$store.commit('pass',this.param.password);//保存密码
                				this.$router.push('/home');
                				
                			}else{
                				this.$message({
                					message:res.data.message,
                					type:'warning'
                				})
                			}
                		}
                		console.log(res)
                	})
                	.catch(err => console.log(err))
                }
            });
        },
    },
};
</script>

<style scoped>
.nav-header{
	position: absolute;
	width: 100%;
	top: 0;
	height: 55px;
	line-height: 55px;
	background-color: #3A3B3B;
	color: #fff;
}
.login-wrap {
    position: absolute;
    top: 55px;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size:cover;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

</style>