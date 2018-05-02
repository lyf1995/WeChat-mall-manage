<template>
	<div class="commodity_category">
		<el-card class="search_card">
			<el-form :inline="true" :model="searchInfo" style="width:100%;"  label-position="right"  label-width="100px">
				<el-form-item label="分类ID">
    				<el-input v-model="searchInfo.id" placeholder="商品名称"></el-input>
  				</el-form-item>
				<el-form-item label="分类名称">
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
					新增分类
				</el-button>
			</div>
			<el-table :data="categoryList" border style="width: 100%" v-loading="loading">
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="id" label="分类ID"></el-table-column>
				<el-table-column prop="name" label="分类名称"></el-table-column>
				<el-table-column prop="describe" label="分类描述"></el-table-column>
				<el-table-column label="操作" width="200" fixed="right" align="center">
      				<template slot-scope="scope">
        				<el-button size="mini" type="primary">
        					<i class="iconfont icon-icon6" style="margin-right:5px;"></i>编辑
        				</el-button>
        				<el-button size="mini" type="danger">
        					<i class="iconfont icon-shanchu" style="margin-right:5px;"></i>删除
        				</el-button>
      				</template>
				</el-table-column>
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
					id: '',
					name: ''
				},
				categoryList: [
					{
						id: 1,
						name: '食品生鲜',
						describe: '有关食品生鲜的商品分类',
					}
				]
			}
		},
		methods:{
			search(){

			},
			goToDetail(row){
				this.$router.push({path:'/commodityManage/commodityDetail',query:{
					id:row.id
				}})
			},
			//导出
			exportExcel(){

			}
		}
	}
</script>
<style scoped>
	.commodity_category{
		padding-bottom: 20px;
		background: #fff;
	}
	.search_card{
		margin-bottom: 20px;
	}
	.search_btn{

	}
	.operation_btn{
		float: right;
		margin-right: 5px;
		margin-bottom: 20px;
	}
	.operation_btn:nth-of-type(2){
		margin-right: 10px;
	}
	.operation_btn i{
		margin-right: 5px;
	}
</style>