<template>
	<div>
		<!--这个组件的日志里面的部分的选择项目名称后的数据、-->
		<el-form :label-width='width+"px"' ref='editForm' :model='editForm':rules='editFormRules'>
			<el-form-item label='业务名称：'>
				<el-input v-model='editForm.name'class='form_ipt'placeholder="请输入业务名称"></el-input>
			</el-form-item>
			<el-form-item label='合同编号：'>
				<el-input v-model='editForm.num' class='form_ipt'placeholder="请输入合同编号"></el-input>
			</el-form-item>
			<el-form-item label='组织机构名称：'>
				<el-select v-model='editForm.agName' filterable class='form_ipt'placeholder="请选择组织机构">
					<el-option v-for='item in agencyArr'
						:key='item'
						:value='item'
						:label='item.name'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label='项目名称：'>
				<el-select v-model='editForm.proName' filterable class='form_ipt'placeholder="请选择项目名称">
					<el-option v-for='item in projectArr'
						:key='item'
						:value='item'
						:label='item.name'></el-option>
				</el-select>
			</el-form-item>
			<div v-show='editForm.proName!==""'>
				<el-form-item label='项目区域：'>
					<span>{{editForm.region}}</span>
				</el-form-item>
				<el-form-item label='绑定上限值：'>
					<el-radio v-model='bandType'   label="illimited">无限</el-radio>
	  				<el-radio v-model='bandType'  label="limited">有限</el-radio>
	  				<el-input v-show='bandType === "limited"' 
	  					v-model='editForm.bandValue' 
	  					class='ipt'placeholder="请输入绑定的有限值"></el-input>
				</el-form-item>
				<el-form-item label='带宽：'>
					<el-slider
				      v-model="editForm.bandWdith"
				      show-input
				      :min='0'
				      :max='100000'
				      style='width: 293px;'
				      >
				    </el-slider>
				</el-form-item>
				<el-form-item label='计费开始时间：'>
					<el-date-picker 
						v-model="editForm.startDate" 
						type="datetime" 
						:picker-options="pickerStartDate" 
						placeholder="选择日期"
						class='form_ipt'
						>
          			</el-date-picker>
				</el-form-item>
				<el-form-item label='计费结束时间：'>
					<el-date-picker 
						v-model="editForm.endDate" 
						type="datetime" 
						:picker-options="pickerCloseDate" 
						placeholder="选择日期" 
						size="medium"
						class='form_ipt'>
          			</el-date-picker>
				</el-form-item>
			</div>
			<el-form-item label='备注：'>
				<el-input type='textarea'v-model='editForm.des' class='form_ipt'placeholder="请输入备注"></el-input>
			</el-form-item>
			<div align='center'>
				<el-button size='mini' type='primary' @click='addSave'>保存</el-button>
				<el-button size='mini' type='info'>取消</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	export default{
		name:'DiaModule',
		props:{
			labelWidth:{//默认label-width的宽度是200
				type:Number,
				default:200
			}
		},
		computed:{
			width(){
				return this.labelWidth
			}
		},
		data(){
			return {
				bandType:'',
				editForm:{
					name:'',
					num:'',
					agName:'',
					proName:'',
					region:'',
					bandWdith:'',
					bandValue:'',
					startDate:'',
					endDate:'',
					des:''
				},
				editFormRules:{},
				agencyArr:[],
				projectArr:[],
				pickerStartDate: {
			        disabledDate: time => {
			          	if (this.editForm.endDate) {
			            	return time.getTime() > this.editForm.endDate
			          	}
			        }
			   	},
			    pickerCloseDate: {
			        disabledDate: time => {
			          	return time.getTime() < this.editForm.startDate
			        }
			    }
			}
		},
		methods:{
			addSave(){
				//创建成功的时候 向父组件传递一个事件
				this.$emit('addSuccess')
			}
		}
	}
</script>

<style>
</style>