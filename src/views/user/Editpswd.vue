<template>
	<div class="editContent" >
		<el-form label-width='200px' :model='editForm'ref='editForm':rules='editFormRules'>
			<el-form-item label='登录账号：'>
				<span>{{name}}</span>
			</el-form-item>
			<el-form-item label='请输入旧密码'prop='oldPsd'>
				<el-input v-model='editForm.oldPsd'class='form_ipt'></el-input>
				<!--<inp-tool>
					<span slot='oneContent'>,6-20位字符</span>
					<span slot='twoContent'>,至少包含数字，字母或下划线中的两种</span>
					<el-input v-model='editForm.oldPsd'class='form_ipt'slot='input'></el-input>
				</inp-tool>-->
			</el-form-item>
			<el-form-item label='请输入新密码' prop='newPsd'>
				<inp-tool>
					<span slot='oneContent'>,6-20位字符</span>
					<span slot='twoContent'>,至少包含数字，字母或下划线中的两种</span>
					<el-input v-model='editForm.newPsd'class='form_ipt'slot='input'></el-input>
				</inp-tool>
			</el-form-item>
			<el-form-item label='确认新密码' prop='conPsd'>
				<el-input v-model='editForm.conPsd'class='form_ipt'></el-input>
				
				<!--<inp-tool>
					<span slot='oneContent'>,6-20位字符</span>
					<span slot='twoContent'>,至少包含数字，字母或下划线中的两种</span>
					<el-input v-model='editForm.conPsd'class='form_ipt'slot='input'></el-input>
				</inp-tool>-->
			</el-form-item>
			<el-form-item>
				<el-button type='primary' size='small' @click='save'>确认</el-button>
				<el-button type='primary' size='small'@click='reset'>清空</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import inpTool from 'components/common/inpTool'
	import { testPsd } from 'components/commonJS/index'
	export default{
		name:'EditPswd',
		components:{
			inpTool
		},
		data(){
			var oldPassword=(rule,value,callback)=> {
				if(!value){
					callback(new Error('请输入旧密码'))
				}else if( value != this.old ){
					
					callback(new Error('请输入正确的旧密码'))
				}else{
					callback()
				}
			};
			var newPassword =(rule,value,callback) => {
				if(!value){
					callback(new Error('请输入新密码'))
				}else if( !testPsd(value) ){
					callback(new Error('请输入正确的新密码'))
				}else{
					callback()
				}
			};
			var conPassword=(rule,value,callback) => {
				if(!value){
					callback(new Error('请确认新密码'))
				}else if( this.editForm.newPsd !== this.editForm.conPsd){
					callback(new Error('密码输入不一致'))
				}else{
					callback()
				}
			};
			return {
				name:this.$store.state.info.name,
				editForm:{
					oldPsd:'',
					newPsd:'',
					conPsd:''
				},
				editFormRules:{
					oldPsd:[{required:true,validator:oldPassword,trigger:'blur'}],
					newPsd:[{required:true,validator:newPassword,trigger:'blur'}],
					conPsd:[{required:true,validator:conPassword,trigger:'blur'}],
				},
				old:this.$store.state.password
			}
		},
		methods:{
			save(){
				this.$refs.editForm.validate(valid => {
					if(valid){
						var params={
							old_pass:this.old,
							new_pass:this.editForm.newPsd
						}
						this.$http.post('/me/edit_pass',params)
						.then(res => {
							if(res.status==200 && res.data.status ==0){
								this.$message({
									message:'修改成功',
									type:'success'
								});
								this.$refs.editForm.resetFields()
								this.$router.replace('/login');
								this.$store.commit('dropOut');
							}
						}).catch(err => console.log(err))
					}
				})
			},
			reset(){
				this.$refs.editForm.resetFields()
			}
		} 
	}
</script>

<style scoped>
	.editContent{
		/*position: a;*/
		position: absolute;
		left: 50%;
		margin-left: -25%;
		top: 50%;
		margin-top: -15%;
		padding:50px 100px 50px 0;
		border-radius:5px;
		background-color: #fff;
	}
</style>