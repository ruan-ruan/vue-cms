// 这个文件是对request里面的的数据请求方式的封装
import request from './request';
import axios from 'axios'
const http={
	/**
	 * methods:请求方式
	 * @param url 请求地址
	 * @param params 请求参数
	 * */
	post(url,params={}){
		const config={
			method:'post',
			url:url,
		}
		if(params) config.data=params;
		return request(config)
	}
}

export default http;// 导出已经封装好的http请求
