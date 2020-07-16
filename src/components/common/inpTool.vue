<template>
	<div>
		<el-tooltip class="mar4" effect="light"  placement="right">
			<div slot='content'>
				<lab-num>
					<span slot='container'>
						<slot name='oneContent'></slot>
					</span>
				</lab-num>
				<lab-num class='marT5':num='2'>
					<span slot='container'>
						<slot name='twoContent'></slot>
					</span>
				</lab-num>
			</div>
			<slot name='input'></slot>
		</el-tooltip>
	</div>
</template>

<script>
	import labNum from './labNum'
	export default{
		name:'inpTool',
		components:{
			labNum
		}
	}
</script>

<style>
</style>