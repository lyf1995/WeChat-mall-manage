<template>
	<div class="sidebar">
		<el-menu unique-opened :default-active="$route.path" class="my-menu" router background-color="#324157" text-color="#bfcbd9">
			<template  v-for="(item , index) in $router.options.routes" v-if="item.menuShow">
				<el-submenu :index="item.path"  v-if="item.hasChild">
					<template slot="title">
						<i :class="item.iconfont"></i>{{item.name}}
					</template>
					<el-menu-item v-for="(itemChild , index) in item.children" :index="itemChild.path" :key="index" v-if="itemChild.menuShow">
						{{itemChild.name}}
					</el-menu-item>
				</el-submenu>
				<el-menu-item :index="item.path" v-else>
					{{item.name}}
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				
			}
		},
		mounted(){
			
		}
	}
</script>
<style scoped>
	.sidebar{
		position:absolute;
		width:160px;
		height:calc(100% - 60px);
		top:60;
		left:0;
		box-sizing: border-box;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.my-menu{
		height:100%;
	}
	.iconfont{
		color:white;
		margin-right:10px;
	}
</style>