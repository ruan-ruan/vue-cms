<template>
	<div>
		<!--根据数据的类型不同显示不通过的数据-->
		<div class='circle'>
			<animate-number from="0" :to='To' class='spn'></animate-number>
		</div>
		<div class="marT10">{{ tit }}</div>
	</div>
</template>

<script>
	export default{
		name:'Number',
		props:{
			cla:{
				type:String,
				default:""
			},
			title:{
				type:String,
				default:''
			},
			Num:{
				type:Number,
				default:0
			}
		},
		computed:{
			To(){
				return this.Num;//数据截止的数
			},
			tit(){
				return this.title;
			}
			
		}
		
	}
</script>

<style scoped>
	.circle{
		width: 100px;
		height: 100px;
		line-height: 100px;
		border-radius:50% ;
		background-color: rgba(141,248,231,0.5);
		text-align: center;
	}
	.title{
		
	}
	.spn{
		font-size: 25px;
	}
	
</style>