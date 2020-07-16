//vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store=new Vuex.Store({
	state:{
		token:null,
		authkey:null,
		menu:null,
		privileges:null,
		info:null,
		password:null
	},
	mutations:{
		cToken(state,msg){
			sessionStorage.setItem('token',msg);
			state.token=msg;
		},
		authkey(state,msg){
			sessionStorage.setItem('auth',msg);
			state.authkey=msg;
		},
		menu(state,msg){
			sessionStorage.setItem('asideList',JSON.stringify(msg));
			state.menu=msg;
		},
		privileges(state,msg){
			sessionStorage.setItem('pri',JSON.stringify(msg));
			state.privileges=msg
		},
		info(state,msg){
			sessionStorage.setItem('info',JSON.stringify(msg));
			state.info=msg;
		},
		pass(state,msg){
			console.log(msg)
			sessionStorage.setItem('password',msg);
			state.password=msg;
		},
		dropOut(state){
			state={
				token:null,
				authkey:null,
				menu:null,
				privileges:null,
				info:null
			}
			sessionStorage.removeItem('token')
		}
	}
})

export default store
