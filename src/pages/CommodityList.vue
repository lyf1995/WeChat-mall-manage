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
    				<el-select v-model="searchInfo.typeId" placeholder="商品分类" clearable>
    					<el-option v-for="(item, index) in typeList" :value="item.id" :label="item.typeName" :key="index"></el-option>
    				</el-select>
  				</el-form-item>
  				<el-form-item label="状态">
    				<el-select v-model="searchInfo.status" placeholder="状态">
    					<el-option value="0" label="未删除"></el-option>
    					<el-option value="1" label="已删除"></el-option>
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
				<!-- <el-button type="primary" class="operation_btn" @click="exportExcel">
					<i class="iconfont icon-tubiao105"></i>
					导出
				</el-button> -->
				<el-button type="primary" class="operation_btn" @click="goToBatchAdd">
					<i class="iconfont icon-icon-import"></i>
					导入
				</el-button>
				<el-button type="primary" class="operation_btn" @click="goToAdd">
					<i class="iconfont icon-icon--"></i>
					新增商品
				</el-button>
			</div>
			<el-table :data="commodityList" border style="width: 100%" v-loading="loading">
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="name" label="商品名称" width="200" class="ellipsis"></el-table-column>
				<el-table-column prop="subtitle" label="商品描述" class="ellipsis"></el-table-column>
				<el-table-column prop="retailPrice" label="零售价" width="60"></el-table-column>
				<el-table-column prop="vipPrice" label="会员价" width="60"></el-table-column>
				<el-table-column prop="stock" label="库存" width="60"></el-table-column>
				<el-table-column prop="typeName" label="商品分类" width="100"></el-table-column>
				<el-table-column label="操作" width="200" fixed="right" align="center">
      				<template slot-scope="scope">
        				<el-button size="mini" type="primary" @click="goToDetail(scope.row)">
        					<i class="iconfont icon-icon6" style="margin-right:5px;"></i>编辑
        				</el-button>
        				<el-button size="mini" type="danger" @click="deleteCommodity(scope.row)" v-if="scope.row.isDelete === 0">
        					<i class="iconfont icon-shanchu" style="margin-right:5px;"></i>删除
        				</el-button>
        				<el-button size="mini" type="danger" @click="reductionCommodity(scope.row)" v-else>
        					<i class="iconfont icon-shanchu" style="margin-right:5px;"></i>还原
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
	import { SelectAllCommodity, AddCommodity, UpdateCommodity, DeleteCommodity, SelectAllType, ReductionCommodity } from '@/js/api'
	export default {
		data(){
			return{
				loading: false,
				typeList:[],
				searchInfo: {
					name: '',
					subtitle: '',
					typeId: '',
					status: '0',
					pageIndex: 1,
					pageSize: 15,
					pageTotal: 0
				},
				commodityList: []
			}
		},
		methods:{
			//获取所有商品分类
			selectAllType(){
				SelectAllType({id: '',typeName: ''}).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.typeList = value;
					}
					else{
						this.$message({
							message: errMsg,
							type: 'error'
						})
					}
				});
			},
			getCommodityInfoList(){
				this.loading = true;
				let params = JSON.parse(JSON.stringify(this.searchInfo));
				SelectAllCommodity(params).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.commodityList = value;
						for(let item of this.commodityList){
							for(let childItem of this.typeList){
								if(item.typeId == childItem.id){
									item.typeName = childItem.typeName
								}
							}
						}
						this.searchInfo.total = parseInt(extraInfo);
					}
					else{
						this.$message({
							message: errMsg,
							type: 'error'
						})
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
				this.getCommodityInfoList();
			},
			handleCurrentChange(val){
				this.searchInfo.pageIndex=val;
				this.getCommodityInfoList();
			},
			search(){
				this.getCommodityInfoList();
			},
			goToDetail(row){
				this.$router.push({path:'/commodityManage/commodityDetail',query:{
					id:row.id
				}})
			},
			goToAdd(){
				this.$router.push({path:'/commodityManage/addCommodity'})
			},
			goToBatchAdd(){
				this.$router.push({path:'/commodityManage/batchAddCommodity'})
			},
			//导出
			exportExcel(){
				require.ensure([], () => {　　　　　　　　
			    const { export_json_to_excel } = require('@/vendor/Export2Excel');　　//引入文件　　　　　　
			    const tHeader = ['商品名称','商品描述','零售价','会员价','库存','商品分类']; //将对应的属性名转换成中文
			    const filterVal = ['name','subtitle','retailPrice','vipPrice','stock','typeName'];//table表格中对应的属性名
			    const list = this.commodityList;
			    tHeader.unshift('序号');
				filterVal.unshift('index');
			    for(let i=0;i<list.length;i++){
			    	list[i].index=i+1+'';
			    }　　　　　　
			    const data = this.formatJson(filterVal, list);　　　　　
			    export_json_to_excel(tHeader, data, '商品导出excel');
			    })
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]));
			},
			//删除商品
			deleteCommodity(row){
				this.$confirm('是否确定删除?', '提示', {
		          	confirmButtonText: '确定',
	         	 	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	var params = {
		        		id: parseInt(row.id)
		        	};
		        	DeleteCommodity(params).then(data => {
		        		let { errMsg, errCode, value, success, extraInfo } = data;
		        		if(success){
		        			this.$message({
				        		message: '删除成功',
				        		type: 'success'
				        	});
				        	this.getCommodityInfoList();
		        		}
		        		else{
		        			this.$message({
				        		message: errMsg,
				        		type: 'success'
				        	})
		        		}
		        	});
		        }).catch(() => {
		           
		        });
			},
			//还原商品
			reductionCommodity(row){
				this.$confirm('是否确定还原?', '提示', {
		          	confirmButtonText: '确定',
	         	 	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	var params = {
		        		id: parseInt(row.id)
		        	};
		        	ReductionCommodity(params).then(data => {
		        		let { errMsg, errCode, value, success, extraInfo } = data;
		        		if(success){
		        			this.$message({
				        		message: '还原成功',
				        		type: 'success'
				        	});
				        	this.getCommodityInfoList();
		        		}
		        		else{
		        			this.$message({
				        		message: errMsg,
				        		type: 'success'
				        	})
		        		}
		        	});
		        }).catch(() => {
		           
		        });
			}
		},
		mounted(){
			//获取所有商品分类
			this.selectAllType();
			//获取所有商品
			this.getCommodityInfoList();
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
	.ellipsis{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.pagination_wrap{
		float:right;
		padding:20px 0;
	}
</style>