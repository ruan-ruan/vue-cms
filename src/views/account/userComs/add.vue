<template>
	<div>
		<el-form label-width='200px':model='editForm'ref='editForm':rules='editFormRules'>
			<slot name='editModule'></slot>
			<el-form-item label='账号名：'prop='name'>
				<inp-tool>
					<span slot='oneContent'>,4-20位字符</span>
					<span slot='twoContent'>,支持数字,字母与下划线</span>
					<el-input v-model='editForm.name'class='form_ipt'slot='input'></el-input>
				</inp-tool>
			</el-form-item>
			<el-form-item label='密码：' prop='password'>
				<inp-tool>
					<span slot='oneContent'> ,6-20位字符 </span>
					<span slot='twoContent'>,至少包含数字，字母或下划线中的两种</span>
					<el-input v-model='editForm.password'class='form_ipt'slot='input'></el-input>
				</inp-tool>
			</el-form-item>
			<el-form-item label='账号标识：' prop='role'>
				<el-radio-group v-model="editForm.accountId">
				    <el-radio v-for='item in accountArr'
				    	:label='item.value'
				    	:key='item.value'>{{item.label}}</el-radio>
				</el-radio-group>
				<el-select v-model='editForm.role' v-if='roleStatus'class='form_ipt'>
					<el-option v-for='item in roleArr'
						:key='item'
						:label='item.name'
						:value='item.id'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label='状态：'prop='status'>
				<el-radio-group v-model="editForm.status">
				    <el-radio v-for='item in statusArr'
				    	:label='item.value'
				    	:key='item.value'>{{item.label}}</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label='备注：'>
				<el-input type='textarea' v-model='editForm.des'class='form_ipt'></el-input>
			</el-form-item>
		</el-form>
		<div align='center'>
			<el-button v-if='dialogTitle === "add"' type='primary' size='mini'@click='addSave'>保存</el-button>
			<el-button v-else type='primary' size='mini'@click='editSave'>保存</el-button>
			<el-button type='info' size='mini'>取消</el-button>
		</div>
	</div>
</template>

<script>
	import inpTool from 'components/common/inpTool'
	export default{
		name:'add',
		props:{
			dialogTitle:{
				type:String,
				default:''
			}
		},
		components:{
			inpTool
		},
		data(){
			return {
				editForm:{
					name:'',
					password:'',
					status:"",
					accountId:'',
					role:''
				},
				editFormRules:{
					name:[{required:true,message:'请输入账号名',trigger:'blur'}],
					password:[{required:true,message:'请输入密码',trigger:'blur'}],
					status:[  { required: true, message: '请选择状态', trigger: 'change' }],
					role:[  { required: true, message: '请选择活动资源', trigger: 'change' }],
				},
				accountArr:[
					{
						label:'超级管理员',
						value:'superAdmin'
					},{
						label:'管理员',
						value:'admin'
					},{
						label:'普通用户',
						value:'user'
					}
				],
				statusArr:[
					{
						label:'启用',
						value:true
					},{
						label:'禁用',
						value:false
					}
				],
				roleArr:[]
			}
		},
		computed:{
			roleStatus(){
				if( this.editForm.accountId === 'superAdmin' ){
					return false
				}else{
					return true
				}
			}
		},
		methods:{
			addSave(){
				this.$emit('dialogClose')
			},
			editSave(){
				this.$emit('dialogClose')
			}
		}
	}
</script>

<style>
</style>