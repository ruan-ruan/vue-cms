<template>
	<div>
		<el-form label-width='200px' :model='info'ref='info'>
			<el-form-item label='创建时间'>
				<span></span>
			</el-form-item>
			<el-form-item label='业务编号'>
				<span></span>
			</el-form-item>
			<el-form-item label='业务名称'>
				<span></span>
			</el-form-item>
			<el-form-item label='状态'>
				<span></span>
			</el-form-item>
			<el-form-item label='合同编号'>
				<span></span>
			</el-form-item>
			<el-form-item label='组织机构名称'>
				<span></span>
			</el-form-item>
			<el-form-item label='项目名称'>
				<span></span>
			</el-form-item>
			<el-form-item label='项目区域'>
				<span></span>
			</el-form-item>
			<el-form-item label='绑定上限值'>
				<span></span>
			</el-form-item>
			<el-form-item label='剩余绑定值'>
				<span></span>
			</el-form-item>
			<el-form-item label='带宽'>
				<span></span>
			</el-form-item>
			<el-form-item label='计费开始时间'>
				<span></span>
			</el-form-item>
			<el-form-item label='计费结束时间'>
				<span></span>
			</el-form-item>
			<el-form-item label='备注'>
				<span></span>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default{
		name:'businessInfo',
		data(){
			return {
				info:{}
			}
		}
	}
</script>

<style>
</style>