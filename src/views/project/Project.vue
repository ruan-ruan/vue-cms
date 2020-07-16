<template>
	<div class="container">
		<el-form :inline='true' :model='filter' ref='filter'>
			<el-form-item label='项目编号'>
				<el-input v-model='filter.num' class='ipt'></el-input>
			</el-form-item>
			<el-form-item label='项目名称'>
				<el-input v-model='filter.name'class='ipt'></el-input>
			</el-form-item>
			<el-form-item label='区域'>
				<el-input v-model='filter.region'class='ipt'></el-input>
			</el-form-item>
			<el-form-item label='创建时间'>
				<el-date-picker
			      v-model="filter.time"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      >
			   </el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button size='small' type='primary' @click='search'> 搜索</el-button>
				<el-button size='small' type='info'> 重置</el-button>
			</el-form-item>
		</el-form>
		<el-row>
			<el-col :span='8'>
				<el-button size='mini' type='primary' @click='addProject'>创建项目+</el-button>
			</el-col>
			<el-col :span='16' align='right'>
				<export @handleExport='handleExport'></export>
			</el-col>
		</el-row>
		
		
		<el-table :data='users' style='width: 100%;'highlight-current-row @selection-change="selsChange" >
			<el-table-column type='selection'align='center'></el-table-column>
			<el-table-column type='index' label='序号'align='center'></el-table-column>
			<el-table-column prop='time' label='创建时间'align='center'width='85'></el-table-column>
			<el-table-column prop='time' label='项目编号'align='center'></el-table-column>
			<el-table-column prop='time' label='项目名称'align='center'></el-table-column>
			<el-table-column prop='time' label='区域'align='center'></el-table-column>
			<el-table-column prop='time' label='项目备注'align='center'></el-table-column>
			<el-table-column  label='操作'align='center'>
				<template scope-slot='scope'>
					<el-button size='mini' type='primary'@click='handleEdit(scope.$index,scope.row)'>编辑</el-button>
					<el-button size='mini' type='info'@click='handleInfo(scope.$index,scope.row)'>详情</el-button>
					<el-button size='mini' type='danger'@click='handleDelete(scope.$index,scope.row)'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[10, 20, 30, 50]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="total"
	      :pager-count="pagecount">
	    </el-pagination>
		<el-dialog :title='text[dialogTitle]'
			:visible.sync="dialogFormVisible"
			:close-on-click-modal="false"
			v-loading='editLoading'
			width='600px'>
			<el-form :model='editForm'ref='editForm'label-width='200px' :rules='rulesEditForm'>
				<template v-if='dialogTitle==="edit"'>
					<el-form-item label='创建时间'>
						<span>{{editForm.time}}</span>
					</el-form-item>
					<el-form-item label='项目编号'>
						<span>{{editForm.num}}</span>
					</el-form-item>
				</template>
				<el-form-item label='项目名称'>
					<el-input v-model='editForm.name' class='form_ipt'></el-input>
				</el-form-item>
				<el-form-item label='区域'>
					<el-input type='textarea' v-model='editForm.region'class='form_ipt'></el-input>
				</el-form-item>
				<el-form-item label='配置参数'>
					<el-input type='textarea' v-model='editForm.des' class='form_ipt'></el-input>
				</el-form-item>
			</el-form>
			<div class='marB10'align='center'>
				<el-button v-if='dialogTitle==="add"' size='mini' type='primary'@click='addSave'>保存</el-button>
				<el-button v-else size='mini' type='primary'@click='editSave'>保存</el-button>
				<el-button size='mini' type='info' @click='dialogFormVisible=false'>取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Export from 'components/common/Export'
	export default{
		name:'Project',
		components:{
			Export
		},
		data(){
			return {
				filter:{
					num:'',
					name:'',
					region:'',
					time:null
				},
				users:null,
				text:{
					add:'创建',
					edit:'编辑',
				},
				dialogTitle:'',
				dialogFormVisible:false,
				editLoading:false,
				editForm:{
					num:'',
					time:'',
					name:'',
					region:'',
					params:'',
					des:''
				},
				rulesEditForm:{
					
				},
				total:0,
				currentPage:1,
				pageSize:10,
				pagecount:5
			}
		},
		methods:{
			selsChange(val){
				//选择数据
			},
			search(){
				this.$router.push({
					path:'/project-Info',
					query:{
						id:'info'
					}
				})
			},
			handleSizeChange(val){
				//set how much data is displayed on the current page
			},
			handleCurrentChange(val){
				//select current
			},
			addProject(){
				//add project
				this.dialogTitle='add';
				this.dialogFormVisible=true;
			},
			addSave(){
				//add save
				
			},
			editSave(){
				// edit save
			},
			handleEdit(index,row){
				
			},
			handleInfo(index,row){
				
			},
			handleDelete(index,row){
				
			},
			handleExport(command){
				var para={}
				if(command == 'all'){
					//所有页
					para={
						index:'all'
					}
				}else{
					//当前页
					para={}
				}
				this.$confirm('确定要导出数据吗?','提示',{type:'warning'})
				.then(() => {
					console.log(para)
				}).catch()
			},
			exportData(params){
				//根据传参的不同分为当前页面，和所有的数据
//				this.$http.get('',params)
//		    	.then(res => {
//		    		this.excelData=res.data.data.items;
//					this.export2Excel();
//		    	}).catch(err => console.log(err) )
			},
			export2Excel(){
				// 将数据写入表格中
				let that=this;
				require.ensure([],() => {
					const {export_json_to_excel} =require('excel/export2Excel');
					const tHeader=['id',this.$t('Public.name')+'ID',this.$t('Public.description'),this.$t('Public.creation')];
					const filterVal=['id','name','description','creation_time'];
					const list=that.excelData;
					const data=that.formatJson(filterVal,list);
					export_json_to_excel(tHeader,data,this.$t('tooltipMes.download')+'excel')
				})
			},
			formatJson(filterVal,jsonData){
				return jsonData.map(v => filterVal.map (j => v[j]))
			},
		}
	}
</script>

<style scoped>
	.dialog-pro>div{
		width: 600px !important;
	}
</style>