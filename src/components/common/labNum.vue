<template>
	<div >
		<span style="
			display: inline-block;
			width: 15px;
			height: 15px;
			border:1px solid #000000;
			border-radius: 50%;
			text-align: center;
			line-height: 15px;">
			{{labelNum}}
		</span>
		<slot name='container'></slot>
	</div>
</template>

<script>
	export default{
		name:'labNum',
		props:{
			num:{
				type:Number,
				default:1
			}
		},
		computed:{
			labelNum(){
				return this.num;
			}
		}
	}
</script>

<style>
</style>