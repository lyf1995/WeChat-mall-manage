<template>
	<div class="commodity_list">
		<el-card>
			<el-form :inline="true" :model="searchInfo" style="width:100%;"  label-position="right"  label-width="100px">
				<el-form-item lable="商品名称">
					<el-input v-model="searchInfo.name" placeholder="商品名称"></el-input>
				</el-form-item>
			</el-form>
			<div class="search_btn">
				<el-button type="primary" style="margin-left:30px;" @click="search">
					<i class="iconfont icon-icon-chaxun" style="margin-right:5px;"></i>
					查询
				</el-button>
			</div>
		</el-card>
		<el-card>
			<div class="operation_wrap clearfix">
				<el-button type="primary" class="operation_btn">
					<i class="iconfont icon-icon--"></i>
					新增商品
				</el-button>
				<el-button type="primary" class="operation_btn">
					<i class="iconfont icon-icon-import"></i>
					导入
				</el-button>
				<el-button type="primary" class="operation_btn" @click="exportExcel">
					<i class="iconfont icon-tubiao105"></i>
					导出
				</el-button>
			</div>
			<el-table :data="commodityList" border style="width: 100%" v-loading="loading">
				<el-table-column type="index" label="序号" width="50"></el-table-column>
			</el-table>
		</el-card>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				loading: false,
				searchInfo: {
					name
				},
				commodityList: []
			}
		},
		methods:{
			search(){

			},

			//导出
			exportExcel(){

			}
		}
	}
</script>
<style scoped>
	.commodity_list{
		padding-bottom: 20px;
		background: #fff;
	}
	.search_btn{

	}
	.operation_btn{
		float: right;
		margin-right: 5px;
	}
	.operation_btn i{
		margin-right: 5px;
	}
</style>