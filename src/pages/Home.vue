<template>
	<div class="container">
		<my-head></my-head>
		<side-bar></side-bar>
		<div class="right-wrap">
			<el-breadcrumb separator="/" class="breadcrumb">
	  			<el-breadcrumb-item :to="getParentPath">{{parentPathName}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{currentPathName}}</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="content-wrap">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
	import Head from '@/components/Head'
	import SideBar from '@/components/SideBar'
	export default{
		data(){
			return{
				currentPathName:'',
				parentPathName:'',
			}
		},
		computed:{
			getParentPath(){
				return '/'+this.$route.path.split('/')[1];
			}
		},
		components:{
			myHead:Head,
			SideBar:SideBar
		},
		beforeRouteEnter(to,from,next){			
			next(vm=>{
				vm.currentPathName=vm.$route.name;
				for(let i=0;i<vm.$router.options.routes.length;i++){
					if(vm.$router.options.routes[i].path==vm.getParentPath){
						vm.parentPathName=vm.$router.options.routes[i].name;
					}
				}
			});
		},
		watch: {
		    '$route' (to, from) {
		     this.currentPathName=to.name;
		     for(let i=0;i<this.$router.options.routes.length;i++){
					if(this.$router.options.routes[i].path==this.getParentPath){
						this.parentPathName=this.$router.options.routes[i].name;
					}
				}
		  	}
		},
	}
</script>
<style scoped>
	.container{
		height:100%;
		background-color:#e5e9f2;
	}
	.right-wrap{
		margin-left:160px;
	}
	.breadcrumb{
		line-height:50px;
		padding-left:10px;
		font-size:14px;
	}
	.content-wrap{
		position: absolute;
	    right: 0;
	    bottom: 0;
	    height: calc(100% - 110px);
	    width: calc(100% - 160px);
		background: #f3f3f3;
		overflow-y: auto;
	}
</style>