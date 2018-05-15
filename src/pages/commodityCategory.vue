<template>
	<div class="commodity_category">
		<el-card class="search_card">
			<el-form :inline="true" :model="searchInfo" style="width:100%;"  label-position="right"  label-width="100px">
				<el-form-item label="分类ID">
    				<el-input v-model="searchInfo.id" placeholder="商品名称"></el-input>
  				</el-form-item>
				<el-form-item label="分类名称">
    				<el-input v-model="searchInfo.typeName" placeholder="商品名称"></el-input>
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
				<el-button type="primary" class="operation_btn" @click.stop="categoryModalShow('add')">
					<i class="iconfont icon-icon--"></i>
					新增分类
				</el-button>
			</div>
			<el-table :data="categoryList" border style="width: 100%" v-loading="loading">
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="id" label="分类ID"></el-table-column>
				<el-table-column prop="typeName" label="分类名称"></el-table-column>
				<el-table-column prop="typeDescribe" label="分类描述"></el-table-column>
				<el-table-column label="操作" width="200" fixed="right" align="center">
      				<template slot-scope="scope">
        				<el-button size="mini" type="primary" @click.stop="categoryModalShow('edit',scope.row)">
        					<i class="iconfont icon-icon6" style="margin-right:5px;"></i>编辑
        				</el-button>
        				<el-button size="mini" type="danger" @click.stop="deleteCategory(scope.row)">
        					<i class="iconfont icon-shanchu" style="margin-right:5px;"></i>删除
        				</el-button>
      				</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 新增&修改分类模态框 -->
		<el-dialog :visible.sync="categoryModal" :title="categoryTitle" width="700px">
			<el-form :model="categoryInfo" style="width:100%;" label-width="100px" :rules="rules" ref="ruleForm">
				<el-card class="clearfix">
					<el-form-item label="分类名称" prop="typeName">
    					<el-input v-model="categoryInfo.typeName" placeholder="分类名称"></el-input>
  					</el-form-item>
					<el-form-item label="分类描述">
    					<el-input v-model="categoryInfo.typeDescribe" placeholder="分类描述"></el-input>
  					</el-form-item>
  					<div class="btn_wrap">
  						<el-button type="primary" v-if="categoryModalType=='add'" @click="addCategory">添加</el-button>
  						<el-button type="primary" v-if="categoryModalType=='edit'" @click="editCategory">保存</el-button>
  					</div>
				</el-card>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import { SelectAllType, AddType, UpdateType, DeleteType } from '@/js/api'
	export default {
		data(){
			return{
				categoryModal: false,
				categoryTitle: '',
				categoryModalType: '',
				categoryInfo: {
					id: '',
					typeName: '',
					typeDescribe: ''
				},
				loading: false,
				searchInfo: {
					id: '',
					typeName: ''
				},
				categoryList: [],
				rules:{
					typeName:[
						{ required: true, message: '请输入分类名称', trigger: 'blur' },
					]
				}
			}
		},
		methods:{
			getTypeInfoList(){
				this.loading = true;
				let params = JSON.parse(JSON.stringify(this.searchInfo));
				SelectAllType(params).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.categoryList = value;
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
			search(){
				this.getTypeInfoList();
			},
			goToDetail(row){
				this.$router.push({path:'/commodityManage/commodityDetail',query:{
					id:row.id
				}})
			},
			//弹出新增&修改分类的模态框
      		categoryModalShow(type,row){
      			if(type=='add'){
      				this.categoryTitle='新增分类';
      				this.categoryModalType='add';
      				this.categoryModal=true;
      				this.categoryInfo={
      					id: '',
	      				typeName: '',
						typeDescribe: ''
      				}
      			}
      			else if(type=='edit'){
      				this.categoryInfo=Object.assign({},row);
      				this.categoryModal=true;
      				this.categoryTitle='修改分类';
      				this.categoryModalType='edit';
      			}
      		},
      		addCategory(){
      			let params = JSON.parse(JSON.stringify(this.categoryInfo));
      			this.$refs['ruleForm'].validate((valid) => { 
      				if (valid) {
      					AddType(params).then(data =>{
      						let { errMsg, errCode, value, success, extraInfo } = data;
							if(success){
								this.$message({
									message: '添加成功',
									type: 'success'
								});
								this.getTypeInfoList();
							}
							else{
								this.$message({
									message: errMsg,
									type: 'error'
								})
							}
      					});
      				}
      				else {
		            	console.log('error submit!!');
		            	return false;
		          	}
      			});
      		},
			editCategory(){
				let params = JSON.parse(JSON.stringify(this.categoryInfo));
      			this.$refs['ruleForm'].validate((valid) => { 
      				if (valid) {
      					UpdateType(params).then(data =>{
      						let { errMsg, errCode, value, success, extraInfo } = data;
							if(success){
								this.$message({
									message: '修改成功',
									type: 'success'
								});
								this.getTypeInfoList();
							}
							else{
								this.$message({
									message: errMsg,
									type: 'error'
								})
							}
      					});
      				}
      				else {
		            	console.log('error submit!!');
		            	return false;
		          	}
      			});
			},
			deleteCategory(row){
				this.$confirm('是否确定删除?', '提示', {
		          	confirmButtonText: '确定',
	         	 	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	var params = {
		        		id: parseInt(row.id)
		        	};
		        	DeleteType(params).then(data =>{
		        		let { errMsg, errCode, value, success, extraInfo } = data;
		        		if(success){
		        			this.$message({
				        		message: '删除成功',
				        		type: 'success'
				        	});
				        	this.getTypeInfoList();
		        		}
		        		else{
		        			this.$message({
				        		message: errMsg,
				        		type: 'error'
				        	});
		        		}
		        	})
		        	
		          	
		        }).catch(() => {
		           
		        });
			}
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
			this.getTypeInfoList();
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
	.btn_wrap{
		text-align: center;
	}
</style>