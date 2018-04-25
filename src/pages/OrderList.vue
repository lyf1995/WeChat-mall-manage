<template>
	<div class="order_list">
		<el-card class="search_card">
			<el-form :inline="true" :model="searchInfo" style="width:100%;"  label-position="right"  label-width="100px">
				<el-form-item label="订单编号">
    				<el-input v-model="searchInfo.number" placeholder="订单编号"></el-input>
  				</el-form-item>
  				<el-form-item label="订单状态">
    				<el-select v-model="searchInfo.status" placeholder="订单状态" clearable>
    					<el-option label="待付款" value="0"></el-option>
    					<el-option label="待发货" value="1"></el-option>
    					<el-option label="待收货" value="2"></el-option>
    					<el-option label="已完成" value="3"></el-option>
    				</el-select>
  				</el-form-item>
  				<el-form-item label="客户信息">
    				<el-input v-model="searchInfo.custormerInfo" placeholder="客户信息"></el-input>
  				</el-form-item>
  				<el-form-item label="创建时间">
    				<el-input v-model="searchInfo.setUpTime" placeholder="创建时间"></el-input>
  				</el-form-item>
  				<el-form-item label="备注">
    				<el-input v-model="searchInfo.remarks" placeholder="备注"></el-input>
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
					新增订单
				</el-button>
			</div>
			<el-table :data="commodityList" border style="width: 100%" v-loading="loading">
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="number" label="订单编号"></el-table-column>
				<el-table-column prop="status" label="订单状态"></el-table-column>
				<el-table-column prop="custormerInfo" label="客户信息"></el-table-column>
				<el-table-column prop="vipPrice" label="订单详情"></el-table-column>
				<el-table-column prop="stock" label="收货信息"></el-table-column>
				<el-table-column prop="money" label="金额"></el-table-column>
				<el-table-column prop="categoryName" label="备注"></el-table-column>
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
					name
				},
				commodityList: [
					{
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

			//导出
			exportExcel(){

			}
		}
	}
</script>
<style scoped>
	.order_list{
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