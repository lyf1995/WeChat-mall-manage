<template>
	<div class="commodity_list">
		<el-card class="search_card">
			<el-form :inline="true" :model="searchInfo" style="width:100%;"  label-position="right"  label-width="100px">
				<el-form-item label="商品名称">
    				<el-input v-model="searchInfo.name" placeholder="商品名称"></el-input>
  				</el-form-item>
  				<el-form-item label="商品描述">
    				<el-input v-model="searchInfo.subtitle" placeholder="商品描述"></el-input>
  				</el-form-item>
  				<el-form-item label="商品分类">
    				<el-input v-model="searchInfo.categoryName" placeholder="商品分类"></el-input>
  				</el-form-item>
  				<el-form-item label="库存">
    				<el-input v-model="searchInfo.stock" placeholder="库存"></el-input>
  				</el-form-item>
  				<el-form-item label="状态">
    				<el-select v-model="searchInfo.status" placeholder="状态">
    					<el-option value="未删除" label="未删除"></el-option>
    					<el-option value="已删除" label="已删除"></el-option>
    				</el-select>
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
				<el-button type="primary" class="operation_btn" @click="exportExcel">
					<i class="iconfont icon-tubiao105"></i>
					导出
				</el-button>
				<el-button type="primary" class="operation_btn">
					<i class="iconfont icon-icon-import"></i>
					导入
				</el-button>
				<el-button type="primary" class="operation_btn">
					<i class="iconfont icon-icon--"></i>
					新增商品
				</el-button>
			</div>
			<el-table :data="commodityList" border style="width: 100%" v-loading="loading">
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="name" label="商品名称"></el-table-column>
				<el-table-column prop="subtitle" label="商品描述"></el-table-column>
				<el-table-column prop="marketPrice" label="零售价"></el-table-column>
				<el-table-column prop="vipPrice" label="会员价"></el-table-column>
				<el-table-column prop="stock" label="库存"></el-table-column>
				<el-table-column prop="categoryName" label="商品分类"></el-table-column>
				<el-table-column label="操作" width="200" fixed="right" align="center">
      				<template slot-scope="scope">
        				<el-button size="mini" type="primary" @click="goToDetail(scope.row)">
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
					name: '',
					subtitle: '',
					categoryName: '',
					stock: '',
					status: '未删除'
				},
				commodityList: [
					{
						id: 1,
						name: '智利泰瑞贵族珍藏佳美娜干红葡萄酒750mL',
						subtitle: '非凡深邃的红宝石颜色，红色浆果、烟草、巧克力和纯净的果香演绎珍藏赤霞珠的盛世繁华、热情而高雅',
						marketPrice: '110',
						vipPrice: '120',
						stock: '10000',
						categoryName: '食品生鲜'
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
	.commodity_list{
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