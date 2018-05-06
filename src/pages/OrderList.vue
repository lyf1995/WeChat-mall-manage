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
  				<el-form-item label="下单时间">
  					<el-date-picker v-model="searchInfo.orderTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
  					</el-date-picker>
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
				<!-- <el-button type="primary" class="operation_btn">
					<i class="iconfont icon-icon-import"></i>
					导入
				</el-button> -->
				<!-- <el-button type="primary" class="operation_btn">
					<i class="iconfont icon-icon--"></i>
					新增订单
				</el-button> -->
			</div>
			<el-table :data="orderList" border style="width: 100%" v-loading="loading">
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="number" label="订单编号"></el-table-column>
				<el-table-column prop="status" label="订单状态"></el-table-column>
				<el-table-column prop="custormer" label="下单客户"></el-table-column>
				<el-table-column label="订单详情" width="300">
					<template slot-scope="scope">
        				<div class="commodity" v-for="(item, index) in scope.row.commodityList" style="padding-bottom:10px;">
        					<p>{{item.commodityName}}</p>
        					<p>单价:{{item.commodityVipPrice}}元/件</p>
        					<p>数量:{{item.commodityNumber}}/件</p>
        				</div>
      				</template>
				</el-table-column>
				<el-table-column prop="money" label="金额"></el-table-column>
				<el-table-column label="收货信息">
					<template slot-scope="scope">
        				<el-tooltip placement="right">
						  	<div slot="content" style="width:300px;">
						  		<div class="tool_top">收货信息</div>
						  		<div class="tool_middle">
						  			<p>收货人：{{scope.row.receiptInfo.receiptName}}</p>
						  			<p>手机号码：{{scope.row.receiptInfo.receiptPhone}}</p>
						  			<p>收货地址：{{scope.row.receiptInfo.receiptAddress}}</p>
						  		</div>
						  	</div>
						  	<el-button>收货人：{{scope.row.receiptInfo.receiptName}}</el-button>
						</el-tooltip>
      				</template>
				</el-table-column>
				<el-table-column prop="remarks" label="备注"></el-table-column>
				<el-table-column prop="orderTime" label="下单时间"></el-table-column>
				<el-table-column label="操作" width="200" fixed="right" align="center">
      				<template slot-scope="scope">
        				<el-button size="mini" type="primary">
        					<i class="iconfont icon-icon6" style="margin-right:5px;"></i>发货
        				</el-button>
        				<!-- <el-button size="mini" type="danger">
        					<i class="iconfont icon-shanchu" style="margin-right:5px;"></i>删除
        				</el-button> -->
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
					number: '',
					status: '',
					custormerInfo: '', 
					orderTime: '',
					orderStartTime: '',
					orderEndTime: ''
				},
				orderList: [
					{
						number:'D111111111111',
						status: '代付款',
						custormer: '张三',
						commodityList: [
							{
								commodityName:'浙江象山红美人柑橘--T12 4.5斤/盒 12颗/盒',
								commodityNumber: '1',
								commodityVipPrice: '100'
							},
							{
								commodityName:'浙江象山红美人柑橘--T12 4.5斤/盒 12颗/盒',
								commodityNumber: '1',
								commodityVipPrice: '100'
							}
						],
						money: '200',
						receiptInfo: {
							receiptName:'李四',
							receiptPhone:'17826804660',
							receiptAddress:'浙江省杭州市西湖区留下街道留和路西和公寓'
						},
						remarks: '备注',
						orderTime: '2017-01-01'
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
	.tool_top{
		font-size: 16px;
		border-bottom: 1px solid #fff;
		padding: 10px 0;
	}
	.tool_middle p{
		padding: 5px 0;
		font-size: 14px;
	}
</style>