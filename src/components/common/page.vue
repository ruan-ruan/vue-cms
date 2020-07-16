<template>
	<div>
		分页的封装
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
</template>

<script>
	export default{
		name:'page',
		props:{
			total:{
				type:Number,
				default:0
			},
			currentPage:{
				type:Number,
				default:1
			},
			pageSize:{
				type:Number,
				default:10
			}
		},
		data(){
			return {
				pagecount:5
			}
		},
		methods:{
			handleSizeChange(val){
				//set how much data is displayed on the current page
				//设置当前页显示多个数据
				
			},
			handleCurrentChange(val){
				//select current
				//选择跳转到第几页
			},
		}
	}
</script>

<style scoped>
</style>