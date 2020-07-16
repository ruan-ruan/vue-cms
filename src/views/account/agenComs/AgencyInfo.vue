<template>
	<div>
		<el-form label-width='200px':model='info' ref='info'>
			<el-form-item label='创建时间'>
				<span></span>
			</el-form-item>
			<el-form-item label='组织机构编号'>
				<span></span>
			</el-form-item>
			<el-form-item label='组织机构名称'>
				<span></span>
			</el-form-item>
			<el-form-item label='状态'>
				<span></span>
			</el-form-item>
			<el-form-item label='公司联系人'>
				<span></span>
			</el-form-item>
			<el-form-item label='联系人手机号'>
				<span></span>
			</el-form-item>
			<el-form-item label='组织机构地址'>
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
		name:'AgencyInfo',
		data(){
			return {
				info:{}
			}
		}
	}
</script>

<style>
</style>