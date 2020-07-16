<template>
  <div v-if="item.children && !item.hidden">
    <template>
      <!-- 这个路由对象 item 只有一个子路由的时候，会把子路由放到一级菜单来 -->
      <!-- 除非这个路由对象有属性 alwaysShow: true 这个属性 -->
      <!-- 所以这里的意思是：这个只有一个子路由，子路由没有children，这个路由没有属性 alwaysShow: true -->
      <!-- 那么就将他的唯一子路由放到一级菜单来 -->
      <!-- 20190707 note: 那么这里的icon和title就用子路由的吧 -->
      <router-link v-if="hasOneShowingChildren(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChild) && !item.alwaysShow" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="item.path">
        	<i :class="item.children[0].meta.icon"></i>
        	<span slot='title'>{{item.children[0].meta.title}}</span>>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.path">
        <template slot="title">
        	<i :class="item.meta.icon"></i>
        	<span slot='title'>{{item.meta.title}}</span>
        </template>

        <template v-for="child of item.children" v-if="!child.hidden">
          <sidebar-item
            :item="child"
            :base-path="resolvePath(child.path)"
            v-if="child.children && child.children.length>0" />

          <router-link v-else :to="resolvePath(child.path)">
            <el-menu-item :index="child.path">
            	<i :class="child.meta.icon"></i>
        		<span slot='title'>{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
	import path from 'path'
	//定义siderbar的选项部分
	export default{
		name:'SidebarItem',
		props:{
			item:{
				type:Object,
				default(){
					return {}
				},
				required:true
			},
			basePath:{
				type:String,
				default:''
			}
		},
		computed:{
			sidebarItems(){
				if(this.items && this.items.length !==0) return this.items
			}
		},
		data(){
			return {
				onlyOneChild:null
			}
		},
		methods:{
			hasOneShowingChildren(children, parent){
				const showingChildren = children.filter(item => {
					if(item.hidden){
						return false;
					}else{
						this.onlyOneChild=item;
						return true;
					}
				})
				// 只有一个的时候符合我们这个函数的目的，返回true
				if(showingChildren.length === 1){
					return true
				}
				//如果没有最终的任何的结果的时候，就显示父元素路由
				if(showingChildren.length ===0){
					this.onlyOneChild={
						...parent,
						path:'',
						noShowingChild:true
					}
					return true
				}
				return false
			},
			resolvePath(routePath){
				return path.resolve(this.basePath,routePath);
			}
		}
	}
</script>

<style>
</style>