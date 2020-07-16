<template>
	<div>
		<div class='top'>
			<el-row >
				<!--顶部账号信息部分-->
				<el-col :span='3' align='center'>
					<div>
						<img src="@/assets/img/img.jpg" alt="" class="img" />
					</div>
					<div >{{level}}</div>
				</el-col>
				<el-col :span='12'>
					<ul class="message">
						<li>
							<label>账户编号：</label>
							<span>{{user.no}}</span>
						</li>
						<li>
							<label>账户名称：</label>
							<span>{{user.name}}</span>
						</li>
						<li>
							<label>创建时间：</label>
							<span>{{user.creation_time | timeFormat}}</span>
						</li>
					</ul>
				</el-col>
				<el-col :span='3'align='center'>
					<num title='绑定业务数据' :Num="len"></num>
				</el-col>
				<el-col :span='3' align='center'>
					<num title='已禁用' :Num="len"></num>
				</el-col>
				<el-col :span='3' align='center'>
					<num title='已过期' :Num="len"></num>
				</el-col>
			</el-row>
		</div>
		<h3 class="marT10 marginB20">绑定业务列表</h3>
		
		
		<div class="container">
			<template v-if='users.length >0'>
				<el-table  :data="users"  highlight-current-row  style="width: 100%;"  >
					<el-table-column type="selection"align="center"></el-table-column>
		            <el-table-column type='index' label='序号'align='center'></el-table-column>
					<el-table-column label='创建时间'align='center' width='85'></el-table-column>
					<el-table-column label='业务编号'align='center' ></el-table-column>
					<el-table-column  label='业务名称'align='center'></el-table-column>
					<el-table-column label='状态'align='center'></el-table-column>
					<el-table-column  label='组织机构名称'align='center'></el-table-column>
					<el-table-column  label='项目名称'align='center'></el-table-column>
					<el-table-column  label='带宽(Mbps)'align='center' ></el-table-column>
					<el-table-column  label='计费开始时间'align='center' width='85'></el-table-column>
					<el-table-column  label='计费结束时间'align='center'width='85'></el-table-column>
				</el-table>
			</template>
			<template v-else>
				<div style="width: 100%; text-align: center; font-size: 30px;">暂无数据</div>
			</template>
		</div>
	</div>
</template>

<script>
	import Num from 'components/common/Number'
	export default{
		name:'Home',
		components:{
			Num
		},
		data(){
			return {
				users:[],
				len:100,
				user:this.$store.state.info
			}
		},
		computed:{
			level(){
				if(this.user.level === '1'){
					return '超级管理员'
				}else if(this.user.level === '2'){
					return '客户管理员'
				}else{
					return '普通用户'
				}
			}
		},
		created(){
			console.log(this.user)
		}
	}
</script>

<style scoped>
	.img{
		height: 110px;
		width: 110px;
		border-radius: 50%;
	}
	.top{
		height: 150px;
		width: 100%;
		border-bottom: 5px;
		border-bottom: 2px solid #7E8080;
	}
	.message{
		height: 40px;
		line-height: 40px;
	}

</style>