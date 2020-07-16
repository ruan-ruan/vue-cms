<template>
	<div class="container">
		
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
	    	<el-tab-pane label="业务详情" name="first">
	    		<info></info>
	    	</el-tab-pane>
	    	<el-tab-pane label="绑定账号" name="second">绑定账号</el-tab-pane>
	  	</el-tabs>
	</div>
</template>

<script>
	import Info from './businessInfo'
	export default{
		name:'busTabs',
		components:{
			Info
		},
		data(){
			return {
				activeName:'first',
				id:this.$route.query.id
			}
		},
		methods:{
			handleClick(){
				
			}
		}
	}
</script>

<style>
</style>