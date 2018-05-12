<template>
	<div class="order_list">
		<el-card class="search_card">
			<el-form :inline="true" :model="searchInfo" style="width:100%;"  label-position="right"  label-width="100px">
				<el-form-item label="订单编号">
    				<el-input v-model="searchInfo.number" placeholder="订单编号"></el-input>
  				</el-form-item>
  				<el-form-item label="订单状态">
    				<el-select v-model="searchInfo.status" placeholder="订单状态">
    					<el-option label="全部" value="-1"></el-option>
    					<el-option label="未付款" value="0"></el-option>
    					<el-option label="待发货" value="1"></el-option>
    					<el-option label="待收货" value="2"></el-option>
    					<el-option label="已完成" value="3"></el-option>
    					<el-option label="已取消" value="4"></el-option>
    				</el-select>
  				</el-form-item>
  				<el-form-item label="下单客户">
    				<el-input v-model="searchInfo.phone" placeholder="下单客户"></el-input>
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
			</div>
			<el-table :data="orderList" border style="width: 100%" v-loading="loading">
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="number" label="订单编号" width="150"></el-table-column>
				<el-table-column prop="status" label="订单状态" width="80">
					<template slot-scope="scope">
						{{scope.row.status|statusFormat}}
					</template>
				</el-table-column>
				<el-table-column prop="phone" label="下单客户" width="120"></el-table-column>
				<el-table-column label="订单详情" width="300">
					<template slot-scope="scope">
        				<div class="commodity" v-for="(item, index) in scope.row.productsList" style="padding-bottom:10px;">
        					<p>{{item.goodsName}}</p>
        					<p>单价:{{item.goodsVipPrice}}元/件</p>
        					<p>数量:{{item.goodsNumber}}/件</p>
        				</div>
      				</template>
				</el-table-column>
				<el-table-column label="收货信息" width="180">
					<template slot-scope="scope">
        				<el-tooltip placement="right">
						  	<div slot="content" style="width:300px;">
						  		<div class="tool_top">收货信息</div>
						  		<div class="tool_middle">
						  			<p>收货人：{{scope.row.address.contacts}}</p>
						  			<p>手机号码：{{scope.row.address.phone}}</p>
						  			<p>收货地址：{{scope.row.address.province+scope.row.address.city+scope.row.address.area+scope.row.address.detailAddress}}</p>
						  		</div>
						  	</div>
						  	<el-button>收货人：{{scope.row.address.contacts}}</el-button>
						</el-tooltip>
      				</template>
				</el-table-column>
				<el-table-column label="金额" width="80">
					<template slot-scope="scope">
						￥{{scope.row.totalAmount|monyFormat}}
					</template>
				</el-table-column>
				<el-table-column prop="remarks" label="备注" width="120"></el-table-column>
				<el-table-column prop="orderTime" label="下单时间" width="180"></el-table-column>
				<el-table-column label="操作" width="200" fixed="right" align="center">
      				<template slot-scope="scope">
        				<el-button size="mini" type="primary" v-if="scope.row.status == 1" @click="sendGoods(scope.row.id)">
        					<i class="iconfont icon-icon6" style="margin-right:5px;"></i>发货
        				</el-button>
      				</template>
				</el-table-column>
			</el-table>
			<div class="pagination_wrap">
  				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :page-sizes="[15, 30, 100, 200]"
  				:page-size="searchInfo.pageSize" :current-page="searchInfo.pageIndex" layout="total, sizes, prev, pager, next, jumper" :total="searchInfo.total">
			    </el-pagination>
  			</div>
		</el-card>
	</div>
</template>
<script>
	import { SelectAllOrder,ChangeOrderStatus } from '@/js/api'
	export default {
		data(){
			return{
				loading: false,
				searchInfo: {
					number: '',
					status: '-1',
					phone: '', 
					orderTime: '',
					orderStartTime: '',
					orderEndTime: '',
					pageSize: 15,
					pageIndex: 1,
					total: 0
				},
				orderList: []
			}
		},
		filters:{
			statusFormat(val){
				if(val == 0){
					return '未付款'
				}
				else if(val == 1){
					return '待发货'
				}
				else if(val == 2){
					return '待收货'
				}
				else if(val == 3){
					return '已完成'
				}
				else if(val == 4){
					return '已取消'
				}
			},
			monyFormat(val){
				return parseInt(val).toFixed(2);
			}
		},
		methods:{
			getOrderInfoList(){
				this.loading = true;
				this.searchInfo.orderStartTime = this.searchInfo.orderTime?this.searchInfo.orderTime[0]:'';
				this.searchInfo.orderEndTime = this.searchInfo.orderTime?this.searchInfo.orderTime[1]:'';
				let params = JSON.parse(JSON.stringify(this.searchInfo));
				SelectAllOrder(params).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.orderList = value;
						this.searchInfo.total = JSON.parse(extraInfo);
					}
					else{
						this.$message({
							message: '查询失败',
							type: 'error'
						})
					}
					this.loading = false;
				})
			},
			handleSizeChange(val){
				this.searchInfo.pageSize=val;
				this.getOrderInfoList();
			},
			handleCurrentChange(val){
				this.searchInfo.pageIndex=val;
				this.getOrderInfoList();
			},
			search(){
				this.getOrderInfoList();
			},
			changeOrderStatus(id,status){
				ChangeOrderStatus({id,status}).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.$message({
							message:'发货成功',
							type: 'success'
						});
						this.getOrderInfoList();	
					}
					else{
						this.$message({
							message:'发货失败',
							type: 'error'
						})
					}
				});
			},
			sendGoods(id){
				this.$confirm('是否确定发货?', '提示', {
		          	confirmButtonText: '确定',
	         	 	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.changeOrderStatus(id,2);    	
		        }).catch(() => {
		           
		        });
			},
			//导出
			exportExcel(){

			}
		},
		mounted(){
			this.getOrderInfoList();
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
	.pagination_wrap{
		float:right;
		padding:20px 0;
	}
</style>