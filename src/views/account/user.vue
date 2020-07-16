<template>
	<div class="container">
		<el-form :inline='true':model='filter' ref='filter'>
			<el-form-item label='账号编号'>
				<el-input v-model='filter.businessNum'class='ipt'></el-input>
			</el-form-item>
			<el-form-item label='账号名'>
				<el-input v-model='filter.name'class='ipt'></el-input>
			</el-form-item>
			<el-form-item label='状态'>
				<el-select v-model='filter.status'class='ipt'>
					<el-option v-for='(item,index) in statusArr'
						:key='index'
						:value='item'
						:label='item'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label='账号标识'>
				<el-select v-model='filter.accountId'class='ipt'>
					<el-option v-for='item in accountArr'
						:key='item'
						:value='item'
						:label='item'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label='组织机构名称'>
				<el-select v-model='filter.agencyName'class='ipt'>
					<el-option v-for='item in agencyArr'
						:key='item'
						:label='item'
						:value='item'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label='创建时间'>
				<el-date-picker
			      v-model="filter.time"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期">
			    </el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type='primary' size='small'>搜索</el-button>
				<el-button type='info' size='small'>重置</el-button>
			</el-form-item>
		</el-form>
		<el-row>
			<el-col :span='4' >
				<el-button type='primary' size='mini'@click='addAccount'>添加账号+</el-button>
			</el-col>
			<el-col :span='20' align='right'>
				<export @handleExport='handleExport'></export>
			</el-col>
		</el-row>
		<el-table style='width: 100%;'highlight-current-row @selection-change="selsChange">
			<el-table-column type='selection'></el-table-column>
			<el-table-column type='index' label='序号'></el-table-column>
			<el-table-column label='创建时间' width='85'></el-table-column>
			<el-table-column label='账号编号'align='center'></el-table-column>
			<el-table-column label='账号名' align='center'>
				<template slot-scope='scope'>
					<a @click='handleInfo(scope.$index,scope.row)'>{{scope.row.name}}</a>
				</template>
			</el-table-column>
			<el-table-column label='状态' align='center'></el-table-column>
			<el-table-column label='账号标识' align='center'></el-table-column>
			<el-table-column label='组织机构名称' align='center'></el-table-column>
			<el-table-column label='业务绑定数' align='center'></el-table-column>
			<el-table-column label='备注' align='center'></el-table-column>
			<el-table-column label='操作' align='center'>
				<template slot-scope='scope'>
					<el-button type='warning' size='mini'@click='handleStatus(scope.$index,scope.row)'>禁用</el-button>
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
			width='660px'>
			<add-account :dialogTitle='dialogTitle' @dialogClose='dialogClose'></add-account>
		</el-dialog>
	</div>
</template>

<script>
	import Export from 'components/common/Export'
	import addAccount from './userComs/add'
	export default{
		name:'User',
		components:{
			addAccount,
			Export
		},
		data(){
			return {
				statusArr:['全部','启用','禁用'],
				agencyArr:[],
				accountArr:[],
				filter:{},
				vals:[],
				total:0,
				currentPage:1,
				pageSize:10,
				pagecount:5,
				text:{
					add:'创建'
				},
				dialogFormVisible:false,
				dialogTitle:'',
				
			}
		},
		methods:{
			dialogClose(){
				this.dialogFormVisible=false
			},
			addAccount(){
				this.dialogTitle='add';
				this.dialogFormVisible=true
			},
			handleSizeChange(){
				
			},
			handleCurrentChange(){
				
			},
			handleInfo(index,row){
				
			},
			handleStatus(index,row){
				
			},
			handleEdit(index,row){
				
			},
			handleDelete(index,row){
				
			},
			selsChange(val){
				this.vals=val
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
//		    		if(res.status==200){
//		    			if(res.data.status==0){
//		    				
//		    				this.excelData=res.data.data.items;
//							this.export2Excel();
//		    			}
//		    		}
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