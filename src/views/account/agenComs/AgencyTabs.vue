<template>
	<div class="container">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    		<el-tab-pane label="详情" name="first">
    			<agency-info></agency-info>
    			{{id}}
    		</el-tab-pane>
    		<el-tab-pane label="账号列表" name="second">账号列表</el-tab-pane>
    		<el-tab-pane label="业务列表" name="thired">业务列表</el-tab-pane>
  		</el-tabs>
	</div>
</template>

<script>
	import AgencyInfo from './AgencyInfo'
	export default{
		name:'AgencyTabs',
		components:{
			AgencyInfo
		},
		data(){
			return {
				activeName:'first',
				id:this.$route.query.id
				
//				id:this.$route.params.id
			}
		},
		watch:{
			id(newVal,oldVal){
				console.log(newVal)
			}
		},
		created(){
			console.log(this.id)
		},
		methods:{
			handleClick(){
				
			}
		}
	}
</script>

<style>
</style>