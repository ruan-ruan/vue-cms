import Vue from 'vue';
import Router from 'vue-router';

const Home =() => import ('components/home/Home');
const Login =() => import ('components/page/Login')
Vue.use(Router);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



export default new Router({
	mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {	//主要的组件
            path: '/',
            component: Home,
            meta: { title: 'home文件' },
            children: [
                {
                    path: '/home',
                    component: () => import('views/user/Home'),
                    meta: { title: '首页概览' ,requireAuth:true}
                },
                {
                    path: '/project',
                    component: () => import( 'views/project/Project'),
                    meta: { title: '项目列表' ,requireAuth:true}
                },
                {//项目列表的里面详情
                	path:'/project-Info',
                	component:() => import( 'views/project/proComs/ProInfo'),
                	meta:{title:'项目详情',requireAuth:true}
                },
                {
                    path: '/business',
                    component: () => import('views/project/Business'),
                    meta: { title: '业务列表',requireAuth:true }
                },
                {
                	path:'/business-info',
                	component:() => import ('views/project/busComs/busTabs'),
                	meta:{title:'业务详情',requireAuth:true}
                },
                {
                    path: '/agency',
                    component: () => import('views/account/agency'),
                    meta: { title: '组织结构列表',requireAuth:true }
                },
                {
                	path:'/agenct-info',
                	name:'agenct-info',
                	component:() => import ('views/account/agenComs/AgencyTabs'),
                	meta:{title:'组织结构详情',requireAuth:true}
                },
                {
                    path: '/user',
                    component: () => import('views/account/user'),
                    meta: { title: '账号信息列表',requireAuth:true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ 'components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                	path: '/edit',
                    component: () => import('views/user/Editpswd'),
                    meta: { title: '密码修改',requireAuth:true }
                },
                {
                	path: '/user-add',
                    component: () => import('views/account/userComs/add'),
                    meta: { title: '添加' ,requireAuth:true}
                }
            ]
        },
        {
            path: '/login',
            component: () => import('components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

//const route=[
//	{
//		path:'/login',
//		name:'login',
//		hidden:true,
//		component:Login,
//		meta:{
//			title:'登录',
//			tit:'登录'
//		},
//	},{
//	    path: '/404',
//	    hidden:true,
//	    component: () => import( 'components/page/404.vue'),
//	    meta: { title: '404' }
//	},{
//		path:'/',
//		hidden:false,
//		component:Home,
//		redirect:'home',
//		children:[
//			{
//				path:'home',
//				name:'home',
//				component: () => import('views/user/Home'),
//				meta: { title: '首页概览',icon:'el-icon-lx-home' ,tit:'首页概览'}
//			}
//		]
//	},{
//		path:'/project',
//		hidden:false,
//		component:Home,
//		meta:{
//			title:'项目管理',
//			icon:'el-icon-lx-calendar',
//			tit:''
//		},
//		children:[
//			{
//	            path: 'project',
//	            component: () => import( 'views/project/Project'),
//	            meta: { title: '项目列表',icon:'' ,tit:'项目列表'}
//			},{
//	            path: 'business',
//	            component: () => import('views/project/Business'),
//	            meta: { title: '业务列表',icon:'' ,tit:'业务列表'}
//			}
//		]
//	},{
//		path:'/account',
//		hidden:false,
//		component:Home,
//		meta:{
//			title:'账号管理',
//			icon:'el-icon-rank',tit:''
//		},
//		children:[
//			{
//              path: 'agency',
//              component: () => import('views/account/agency'),
//              meta: { title: '组织结构列表',tit:'组织结构' }
//			},{
//              path: 'user',
//              component: () => import('views/account/user'),
//              meta: { title: '账号信息列表',tit:'账号信息' }
//			}
//		]
//	}
//]

//export default new Router({
//	mode:'history',
//	routes:route
//})
