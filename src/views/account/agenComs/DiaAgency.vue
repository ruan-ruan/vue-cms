<template>
	<div>
		<!--这里会用到添加和编辑的时候使用的界面信息-->
		<el-form :label-width='width+"px"':model='editForm' ref='editForm' :rules='editFormRules'>
			<template v-if='type==="edit"'>
				<el-form-item label='创建时间'>
					<span></span>
				</el-form-item>
				<el-form-item label='组织机构编号'>
					<span></span>
				</el-form-item>
			</template>
			<el-form-item label='组织机构名称' prop='name'>
				<el-input v-model='editForm.name' class='form_ipt'></el-input>
			</el-form-item>
			<el-form-item label='公司联系人' prop='conPerson'>
				<el-input v-model='editForm.conPerson'class='form_ipt'></el-input>
			</el-form-item>
			<el-form-item label='联系人手机号' prop='mobile'>
				<el-input v-model='editForm.mobile'class='form_ipt'></el-input>
			</el-form-item>
			<el-form-item label='组织机构地址'>
				<el-input v-model='editForm.address'class='form_ipt'></el-input>
			</el-form-item>
			<el-form-item label='状态'>
				<el-radio-group v-model="editForm.status">
			    	<el-radio v-for='(item,index) in [{label:"启用",value:true},{label:"禁用",value:false}]'
			    		:key='index'
			    		:value='item.value'
			    		:label='item.label'></el-radio>
			  	</el-radio-group>
			</el-form-item>
			<el-form-item label='备注'>
				<el-input type='textarea' v-model='editForm.des'class='form_ipt'></el-input>
			</el-form-item>
		</el-form>
		<div align='center'>
			<el-button v-if='type ==="add"' type='primary' size='mini' @click='addSave'>保存</el-button>
			<el-button v-else type='primary' size='mini' @click='editSave'>保存</el-button>
			<el-button type='info' size='mini' @click='cancel'>取消</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'DiaAgency',
		props:{
			labelWidth:{
				type:Number,
				default:200
			},
			btnType:{
				type:String,
				default:'add'
			}
		},
		computed:{
			width(){
				return this.labelWidth;
			},
			type(){
				return this.btnType;
			}
		},
		data(){
			return {
				editForm:{
					time:'',
					num:'',
					name:'',
					conPerson:'',
					mobile:'',
					address:'',
					status:'',
					des:''
				},
				editFormRules:{
					name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
					conPerson: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
					mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
				}
			}
		},
		methods:{
			addSave(){
				console.log('添加');
				this.$emit('formData')
			},
			editSave(){
				console.log('保存')
				this.$emit('formData')
			},
			cancel(){
				this.$emit('formData')
			}
		}
	}
</script>

<style>
</style>