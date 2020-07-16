<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
			:default-active="onRoutes"
            background-color="#EEEEEE"
            text-color="#060606"
            active-text-color="#ffd04b"
            unique-opened
            router>
<!--        <sidebar-item v-for="router of routers" :key="router.path" :item="router" :base-path="router.path"></sidebar-item>-->
            <template v-for="item in aside">
                <template v-if="item.child">
                    <el-submenu :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <template v-for="subItem in item.child">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.path"
                                :key="subItem.path">
                                <template slot="title">{{ subItem.name }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.child"
                                    :key="i"
                                    :index="threeItem.path"
                                >{{ threeItem.name }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.path"
                                :key="subItem.path"
                            >{{ subItem.name }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.path" :key="item.path">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
//	import SidebarItem from './SidebarItem'
export default {
	name:'Sidebar',
//	components:{
//		SidebarItem
//	},
	computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        },
    },
    data() {
        return {
            //  这个是路由表的显示的格式
//          items: [
//              {
//                  icon: 'el-icon-lx-home',
//                  index: '/home', //相当于 路由里面的path
//                  title: '首页概览',
//                  hidden:false,
//              },
//              {
//                  icon: 'el-icon-lx-calendar',
//                  index: '2',
//                  title: '项目管理',
//                  hidden:false,
//                  subs: [
//                      {
//                          index: '/project',
//                          title: '项目列表',
//                          hidden:false
//                      },
//                      {
//                          index: 'business',
//                          title: '业务列表',
//                          hidden:false
//                      }
//                  ]
//             	},
//              {
//                  icon: 'el-icon-rank',
//                  index: '3',
//                  title: '账号管理',
//                  hidden:false,
//                  subs: [
//                      {
//                      	index: '/agency',
//                          title: '组织结构列表',
//                          hidden:false
//                      },
//                      {
//                          index: '/user',
//                          title: '账号信息列表',
//                          hidden:false
//                      }
//                  ]
//              },
//          ],
            aside:this.$store.state.menu,//后端的数据格式跟上面是一样的
        };
    },
    created() {

    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 55px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 220px;
}
.sidebar > ul {
    height: 100%;
}
.el-submenu__title i{}
</style>
