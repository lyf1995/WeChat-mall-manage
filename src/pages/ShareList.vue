<template>
	<div class="share_list">
		<el-card class="search_card">
			<el-form :inline="true" :model="searchInfo" style="width:100%;"  label-position="right"  label-width="100px">
				<el-form-item label="分享者">
    				<el-input v-model="searchInfo.shareUser" placeholder="分享者"></el-input>
  				</el-form-item>
  				<el-form-item label="分享商品">
    				<el-input v-model="searchInfo.goodsName" placeholder="分享商品"></el-input>
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
			<el-table :data="shareList" border style="width: 100%" v-loading="loading">
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="shareUserName" label="分享者" width="180"></el-table-column>
				<el-table-column prop="goodsName" label="分享商品" width="280"></el-table-column>
				<el-table-column prop="shareUrl" label="分享链接" width="280"></el-table-column>
				<el-table-column label="分享返利" width="80">
					<template slot-scope="scope">
        				￥{{scope.row.amounts|formatMoney}}
      				</template>
				</el-table-column>
				<el-table-column prop="shareTime" label="分享时间" width="200"></el-table-column>
				<el-table-column label="操作" width="200" fixed="right" align="center">
      				<template slot-scope="scope">
        				<el-button size="mini" type="primary" @click="searchShareUser(scope.row)">
        					查看返利详情
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

		<!-- 分享返利详情模态框 -->
		<el-dialog :visible.sync="shareModel" title="返利详情" width="700px">
			<div class="share_user_List">
				<div v-if="shareUserList.length == 0">
					<span>暂无返利详情</span>
				</div>
				<div class="share_user_item" v-for="(item, index) in shareUserList" v-else>
					<el-card style="text-align: center;margin-bottom:10px;">
						用户<span>{{item.clickUser.phone}}</span>通过分享
						<span v-if="item.status == 0">注册了账号</span>
						<span v-else>购买了分享商品</span>
						,系统返利<span>￥{{item.amount|formatMoney}}</span>
					</el-card>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { SelectAllShare, SelectShareUserByShareId} from '@/js/api'
	export default {
		data(){
			return{
				rebateInfo: {
					registRebate: 0,
					buyRebate: 0
				},

				shareModel: false,
				loading: false,
				searchInfo: {
					shareUser: '',
					goodsName: '',
					pageSize: 15,
					pageIndex: 1,
					total: 0,
				},
				shareList: [],
				shareUserList: [],
			}
		},
		filters:{
			formatMoney(val){
				if(typeof(val)==="number"){
					return val.toFixed(2);	
				}else{
					return val;
				}
			}
		},
		methods:{
			getShareInfoList(){
				this.loading = true;
				let params = JSON.parse(JSON.stringify(this.searchInfo));
				SelectAllShare(params).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.shareList = value;
						this.searchInfo.total = parseInt(extraInfo);
					}
					else{
						this.$message({
							message: errMsg,
							type: 'error'
						});
					}
					this.loading = false;
				});
				let currentPath = this.$route.path;
				this.$router.push({
					path: currentPath,
					query: {
						search: JSON.stringify(params)
					}
				})
			},
			handleSizeChange(val){
				this.searchInfo.pageSize=val;
				this.getShareInfoList();
			},
			handleCurrentChange(val){
				this.searchInfo.pageIndex=val;
				this.getShareInfoList();
			},
			search(){
				this.getShareInfoList();
			},

			//导出
			exportExcel(){
				require.ensure([], () => {　　　　　　　　
			    const { export_json_to_excel } = require('@/vendor/Export2Excel');　　//引入文件　　　　　　
			    const tHeader = ['分享者','分享商品','分享链接','分享返利','分享时间']; //将对应的属性名转换成中文
			    const filterVal = ['shareUserName','goodsName','shareUrl','amounts','shareTime'];//table表格中对应的属性名
			    const list = this.shareList;
			    tHeader.unshift('序号');
				filterVal.unshift('index');
			    for(let i=0;i<list.length;i++){
			    	list[i].index=i+1+'';
			    }　　　　　　
			    const data = this.formatJson(filterVal, list);　　　　　
			    export_json_to_excel(tHeader, data, '分享信息导出excel');
			    })
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]));
			},
			//弹出查看分享详情模态框
      		searchShareUser(row){
  				this.shareModel=true;
  				SelectShareUserByShareId({shareId: row.id}).then(data =>{
  					let { errMsg, errCode, value, success, extraInfo } = data;
  					if(success){
  						this.shareUserList = value;
  					}
  					else{
  						this.$message({
  							message: '查询失败',
  							type: 'error'
  						})
  					}
  				})
      		},
		},
		mounted(){
			//获取当前url中的搜索参数
			try
			{
				this.searchInfo=Object.assign(this.searchInfo,JSON.parse(this.$route.query.search));
			}
			catch(err)
			{
			  	this.searchInfo=Object.assign({},this.searchInfo);
	  		}
	  		//浏览器后退刷新页面
			window.onpopstate = () => {  
			    this.$router.go(0)
			}
			this.getShareInfoList();
		}
	}
</script>
<style scoped>
	.share_list{
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
	.btn_wrap{
		text-align: center;
	}
	.pagination_wrap{
		float:right;
		padding:20px 0;
	}
	.share_user_item span{
		padding: 0 10px;
		font-size: 18px;
		color: #1D8CE0;
	}
</style>