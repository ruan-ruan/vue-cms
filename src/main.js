import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; 
import 'babel-polyfill';//兼容ie
import VueAnimateNumber from 'vue-animate-number'//动态的数据显示
import *as filters from 'components/commonJS/filter.js';//定义全局的过滤器
//全局定义过滤器
Object.keys(filters).forEach(key => {
    Vue.filter( key, filters[key])
})

Vue.use(VueAnimateNumber)
import http from 'network/http.js'
Vue.prototype.$http=http;//设施全局的http数据请求
Vue.config.productionTip = false;
Vue.use(ElementUI);
if(window.sessionStorage.getItem('token')){
	//当页面首先的时候  需要对state里面的token重新赋值,列表，权限按钮详情信息都需要重新赋值
	store.commit('cToken',window.sessionStorage.getItem('token'));//重新赋值token
	store.commit('authkey',window.sessionStorage.getItem('auth'));//重新赋值authkey
	store.commit('menu',JSON.parse(window.sessionStorage.getItem('asideList')));
	store.commit('privileges',JSON.parse(window.sessionStorage.getItem('pri')));
	store.commit('info',JSON.parse(window.sessionStorage.getItem('info')));
	store.commit('pass',window.sessionStorage.getItem('password'))
}
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
//  路由导航守卫
	if (to.matched.some(r => r.meta.requireAuth)){
		//需要登录才可以进入
		if(store.state.token){
			next()
		}else{
			console.log('进入')
			next('/login')
		}
	}else{
		next()
	}
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
