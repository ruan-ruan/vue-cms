<template>
	<div class="container">
		<div>
		<!--d顶部搜索栏-->
			<el-form :model='filter'ref='filter' :inline='true'>
				<el-form-item label='业务编号'>
					<el-input v-model='filter.business' class='ipt'></el-input>
				</el-form-item>
				<el-form-item label='业务名称'>
					<el-input v-model='filter.name'class='ipt'></el-input>
				</el-form-item>
				<el-form-item label='合同编号'>
					<el-input v-model='filter.contract'class='ipt'></el-input>
				</el-form-item>
				<el-form-item label='组织机构'>
					<el-select v-model='filter.agency' class='ipt'filterable>
						<el-option v-for='item in agencyArr'
							:key='item'
							:value='item.value'
							:label='item.name'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label='状态'>
					<el-select v-model='filter.status'class='ipt'filterable>
						<el-option v-for='item in statusArr'
							:key='item'
							:value='item'
							:label='item'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select v-model='filter.timeType' filterable class='ipt'>
						<el-option v-for='item in timeArr'
							:key='item'
							:value='item'
							:label='item'></el-option>
					</el-select>
					<el-date-picker
				      v-model="filter.time"
				      type="datetimerange"
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      class='time'>
				   </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button size='small' type='primary'>搜索</el-button>
					<el-button size='small' type='info'> 重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div>
			<el-row>
				<el-col :span='4'>
					<el-dropdown trigger="click"  ref='messageDrop' :hide-on-click="false">
						<el-button	size='mini' type='primary'class="el-dropdown-link">
						    table展示标题选择<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item v-for='item in checkArr' :key='item'>
								<el-checkbox v-model='selTableItem'
									:value='item'
									:label='item'></el-checkbox>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					
				</el-col>
				<el-col :span='8'>
					<el-button type='primary' size='mini' @click='add'>创建业务+</el-button>
				</el-col>
				<el-col :span='12'align='right'>
					<export @handleExport='handleExport'></export>
				</el-col>
			</el-row>
			
			<el-table :data='users' style='width: 100%;' highlight-current-row @selection-change="selsChange" >
				<el-table-column type='selection'></el-table-column>
				<el-table-column type='index' label='序号' ></el-table-column>
				<el-table-column label='创建时间'width='85'align='center'></el-table-column>
				<el-table-column label='业务编号'align='center'></el-table-column>
				<el-table-column label='业务名称'align='center'>
					<template slot-scope='scope'>
						<span @click='handleInfo(scope.$index,scope.row)'>{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column label='状态'align='center'min-width='60'></el-table-column>
				<el-table-column label='合同编号'align='center'></el-table-column>
				<el-table-column 
					v-for='(item,index) in tableArr' 
					:key='index'   
					:label='item.label' 
					:min-width='item.width'
					align='center'
					v-if='selTableItem.includes(item.label)'>
				</el-table-column>
				<el-table-column label='操作'>
					<template slot-scope='scope'>
						<el-button size='mini'type='warning'@click='handleStatus(scope.$index,scope.row)'>禁用</el-button>
						<el-button size='mini'type='info'@click='handleBind(scope.$index,scope.row)'>绑定账号</el-button>
						<el-button size='mini'type='danger'@click='handleDelete(scope.$index,scope.row)'>删除</el-button>
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
		</div>
		<!--日志部分-->
		<el-dialog 
			:title='text[dialogTitle]' 
			:visible.sync="dialogFormVisible"
			:close-on-click-modal="false"
			v-loading='editLoading'
			width='660px'>
			<dia-module @addSuccess='addSuc' ></dia-module>
		</el-dialog>
	</div>
</template>

<script>
	import Export from 'components/common/Export'
	
	import DiaModule from './busComs/DiaModule'
	export default{
		name:'Business',
		components:{DiaModule,Export},
		data(){
			return {
				filter:{
					business:'',
					name:'',
					contract:'',
					agency:'',
					timeType:'创建时间',
					time:''
					
				},
				statusArr:['全部','离线','在线'],
				agencyArr:[],
				projectArr:[],
				timeArr:['创建时间','计费开始时间','计费结束时间'],
				checkArr:['组织机构名称','项目名称','绑定上限值','绑定下限值','区域','带宽(Mbps)','计费开始时间','计费结束时间'],
				selTableItem:[],//所选择的数据集合
				tableArr:[
					{
						label:'组织机构名称',
						width:'85'
					},{
						label:'项目名称',
						width:'85'
					},{
						label:'绑定上限值',
						width:'60'
					},{
						label:'绑定下限值',
						width:'60'
					},{
						label:'区域',
						width:'60'
					},{
						label:'带宽(Mbps)',
						width:'60'
					},{
						label:'计费开始时间',
						width:'85'
					},{
						label:'计费结束时间',
						width:'85'
					}
				],
				users:[],
				total:0,
				currentPage:1,
				pageSize:10,
				pagecount:5,
				text:{
					add:'创建业务'
				},
				dialogTitle:'',
				editLoading:false,
				dialogFormVisible:false,
				excelData:[],
				
			}
		},
		methods:{
			selsChange(val){
				//选择数据
			},
			handleSizeChange(){
				
			},
			handleCurrentChange(){
				
			},
			add(){
				this.dialogTitle='add';
				this.dialogFormVisible=true
			},
			addSuc(){
				//创建成功的时候，子组件传递过来的数据
				this.dialogFormVisible=false;
				//需要在此调用一个重新获取列表的
				this.getUsers();
			},
			getUsers(){
				//获取列表
			},
			handleInfo(index,row){
				this.$router.push({
					path:'/business-info',
					query:{
						id:'info'
					}
				})
			},
			handleStatus(index,row){
				
			},
			handleBind(index,row){
				
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

<style>
</style>