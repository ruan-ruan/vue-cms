//对axios的封装
import axios from 'axios'
import { Message,Loading } from 'element-ui';
import store from 'store'
//设置loading ,打开和关闭的特效
const loading={
	loadingInstance:null,
	open:function(){
		if(this.loadingInstance === null){
			//创建loading 加载等待中
			this.loadingInstance=Loading.service({
				text:'拼命加载中...',
				background: '#fff'
			})
		}
	},
	close:function(){
		if(this.loadingInstance !==null){
			this.loadingInstance.close()
		}
		this.loadingInstance=null;
	}
}

const request= axios.create({
	//创建axios的实例
	baseURL:'http://da.api.tianchic.com/admin.php',//url
	timeout:50000,//超时时间
	headers:{
		'Content-Type':'application/json;charset=utf-8',
	}
})

//请求拦截
request.interceptors.request.use(config => {
	// 对数据的请求的拦截，设置token验证信息  https://blog.csdn.net/weixin_43216105/article/details/98877960
	Message.closeAll();//关闭所有的消息
	loading.open();//开始加载等待
	config.headers['c-token']=store.state.token;
	config.headers['authkey']=store.state.authkey;
	config.headers['Access-Control-Allow-Origin']='*';
	return config;
},error => {
	loading.close();//出现异常的时候关闭加载等待
	return Promise.reject(error);
})

//响应拦截器
request.interceptors.response.use(response => {
	if(response.data.status ==101){
		store.commit('dropOut');
		router.currentRoute.path !== '/login' &&
		router.replace({path: '/login'})
		window.location.reload();
	}
	//https://www.jianshu.com/p/d2382bc0081d
	loading.close();//请求成功的时候  关闭加载等待
	//成功接收响应的数据的处理
	return response
},error => {
	loading.close();
	return Promise.reject(error)
})


export default request;