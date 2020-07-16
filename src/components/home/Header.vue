<template>
    <div class="header">
    	<el-row>
    		<el-col :span='2'align='right'>
    			<img src="../../assets/img/logo.png"/>
    		</el-col>
    		<el-col :span='6'>
    			<div class="logo">
		        	后台管理系统
		        </div>
    		</el-col>
    		<el-col :span='16'>
    			<div class="header-right">
		            <div class="header-user-con">
		                <!-- 全屏显示 -->
		                <div class="btn-fullscreen" @click="handleFullScreen">
		                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
		                        <i class="el-icon-rank"></i>
		                    </el-tooltip>
		                </div>
		                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
		                    <span class="el-dropdown-link">
		                        {{name}}
		                        <i class="el-icon-caret-bottom"></i>
		                    </span>
		                    <el-dropdown-menu slot="dropdown">
		                    	 <el-dropdown-item divided command="editPswd">修改密码</el-dropdown-item>
		                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
		                    </el-dropdown-menu>
		                </el-dropdown>
		            </div>
		        </div>
    		</el-col>
    	</el-row>
       
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            fullscreen: false,
            name: this.$store.state.info.name,
        };
    },
    created(){
    	console.log(this.$store.state)
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
            	this.$http.post('/me/logout')
            	.then(res => {
            		console.log(res)
            		if(res.status ===200 && res.data.status === 0){
            			this.$message({
            				message:'退出成功!',
            				type:'success'
            			})
            			this.$store.commit('dropOut')
                		this.$router.push('/login');
                		
            		}
            	}).catch(err => console.log(err))
            }
            if(command == 'editPswd'){
            	this.$router.push('/edit')
            }
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 55px;
    font-size: 22px;
    color: #fff;
    background-color: #030303;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 55px;
}
.header .logo {
    float: left;
    /*width: 250px;*/
    line-height: 55px;
    color: #fff;
}
img{
	width: 55px;
	height: 55px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 55px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}

.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}


.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
