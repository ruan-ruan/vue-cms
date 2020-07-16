<template>
	<div>
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
		    <el-tab-pane label="项目详情" name="first">
		    	<project-info></project-info>
		    </el-tab-pane>
		    <el-tab-pane label="业务列表" name="second">业务列表</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import ProjectInfo from './ProjectInfo'
	export default{
		name:'ProInfo',
		components:{
			ProjectInfo
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

<style scoped>
</style>