<template>
	<div class="container">
		<el-form :inline='true':model='filter'ref='filter'>
			<el-form-item label='组织机构编号'>
				<el-input v-model='filter.num'class='ipt'></el-input>
			</el-form-item>
			<el-form-item label='组织机构名称'>
				<el-input v-model='filter.name'class='ipt'></el-input>
			</el-form-item>
			<el-form-item label='状态'>
				<el-select v-model='filter.status'class='ipt'>
					<el-option v-for='item in statusArr'
						:key='item.label'
						:value='item.value'
						:label='item.label'></el-option>
				</el-select>
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
			<el-form-item label='手机号'>
				<el-input v-model='filter.mobile'class='ipt'></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type='primary' size='small' @click='getUsers'>搜索</el-button>
				<el-button type='info' size='small'>重置</el-button>
			</el-form-item>
		</el-form>
		
		<el-row>
			<!--表格数据操作部分-->
			<el-col :span='8'>
				<el-button type='primary' size='mini'@click='add'>创建组织机构+</el-button>
			</el-col>
			<el-col :span='16'align='right'>
				<export @handleExport='handleExport'></export>
			</el-col>
		</el-row>
		<el-table :data='users'style='width: 100%;'highlight-current-row @selection-change="selsChange" >
			<el-table-column type='selection' ></el-table-column>
			<el-table-column type='index'label='序号'align='center'></el-table-column>
			<el-table-column label='创建时间'align='center'width='95'>
				<template slot-scope='scope'>
					{{scope.row.creation_time | timeFormat}}
				</template>
			</el-table-column>
			<el-table-column prop='no' label='组织机构编号'align='center'></el-table-column>
			<el-table-column  label='组织机构名称'align='center'>
				<template slot-scope='scope'>
					<a class="cur backGreen" @click='handleInfo(scope.$index,scope.row)'>{{scope.row.name}}</a>
				</template>
			</el-table-column>
			<el-table-column  label='状态'align='center'width='80'>
				<template slot-scope='scope'>
					<span :class="scope.row.usable===1?'backGreen':'backRed'"> 
						{{ scope.row.usable ===1?"启用":"禁用" }} 
					</span>
				</template>
			</el-table-column>
			<el-table-column prop='contact' label='组织结构联系人'align='center'></el-table-column>
			<el-table-column prop='contact_phone' label='联系人手机号'align='center'></el-table-column>
			<el-table-column prop='address' label='组织结构地址'align='center'></el-table-column>
			<el-table-column label='备注'align='center'width='150'>
				<template slot-scope='scope'>
					<el-button type='warning' size='mini'@click='handleStatus(scope.$index,scope.row)'>
						{{ scope.row.usable ===1?"禁用":"启用" }}
					</el-button>
					<el-button type='primary' size='mini'@click='handleEdit(scope.$index,scope.row)'>编辑</el-button>
					<el-button type='danger' size='mini'@click='handleDelete(scope.$index,scope.row)'>删除</el-button>
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
		<el-dialog 
			:title='text[dialogTitle]' 
			:visible.sync="dialogFormVisible"
			:close-on-click-modal="false"
			v-loading='editLoading'
			width='600px'
			ref='dialog'>
			<dia-agency @formData='DiaForm' :btnType='dialogTitle'>
			</dia-agency>
		</el-dialog>
	</div>
</template>

<script>
	import Export from 'components/common/Export'
	import DiaAgency from './agenComs/DiaAgency'
	export default{
		name:'agency',
		components:{
			DiaAgency,
			Export
		},
		data(){
			return{
				filter:{
					num:'',
					name:'',
					status:'',
					time:null,
					mobile:''
				},
				users:[],
				statusArr:[
					{
						label:'全部',
						value:''
					},{
						label:'可用',
						value:1
					},{
						label:'禁用',
						value:0
					}
				],
				text:{
					add:'创建组织机构'
				},
				dialogTitle:'',
				dialogFormVisible:false,
				editLoading:false,
				total:0,
				currentPage:1,
				pageSize:10,
				pagecount:5,
				oranization:this.$store.state.info.oranization
			}
		},
		created(){
			console.log(this.oranization)
			this.getUsers()
		},
		methods:{
			getUsers(){
				var params={
					search_no:this.filter.num,
					search_name:this.filter.name,
					search_start_time:this.filter.time===null?'':(new Date(this.filter.time[0]).getTime()/1000),
					search_end_time:this.filter.time===null?'':(new Date(this.filter.time[1]).getTime()/1000),
					search_id:'',
					search_usable:this.filter.status,
					search_contact:'',
					search_contact_phone:'',
					page:this.currentPage,
					per_page:this.pageSize,
				}
				
				console.log(params)
				this.$http.post('/organization/list',params)
				.then(res => {
					if(res.status == 200){
						if(res.data.status ==0){
							this.users=res.data.data.items;
						}
					}
					console.log(res)
				}).catch(err => console.log(err))
			},
			selsChange(val){
				//选择数据
			},
			handleSizeChange(){
				
			},
			handleCurrentChange(){
				
			},
			add(){
				this.dialogTitle='add';
				this.dialogFormVisible=true;
				this.$forceUpdate()
			},
			DiaForm(){
				this.dialogFormVisible=false
			},
			handleInfo(index,row){
				console.log(index);
				console.log(row);
				console.log()
				this.$router.push({
					path:'/agenct-info',
					query:{
						id:row.id
					}
				})
			},
			handleStatus(index,row){
				
			},
			handleEdit(index,row){
				
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