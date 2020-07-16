<template>
	<div>
		<el-dropdown size='mini'  split-button type='success' trigger="click" @command="handleExport" >
			导出数据
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="current">
					当前页
				</el-dropdown-item>
				<el-dropdown-item  command="all">
					所有页
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
	
	export default{
		name:'export',
		methods:{
			handleExport(command){
				console.log(command);
				this.$emit('handleExport',command)
			}
		}
	}
	
</script>

<style>
</style>