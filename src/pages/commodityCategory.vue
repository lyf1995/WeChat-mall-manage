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
				<el-button type="primary" class="operation_btn" @click.stop="categoryModalShow('add')">
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
			<el-form :model="categoryInfo" style="width:100%;" label-width="100px">
				<el-card class="clearfix">
					<el-form-item label="分类名称">
    					<el-input v-model="categoryInfo.name" placeholder="分类名称"></el-input>
  					</el-form-item>
					<el-form-item label="分类描述">
    					<el-input v-model="categoryInfo.describe" placeholder="分类描述"></el-input>
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
	export default {
		data(){
			return{
				categoryModal: false,
				categoryTitle: '',
				categoryModalType: '',
				categoryInfo: {
					id: '',
					name: '',
					describe: ''
				},
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
				console.log(this.searchInfo);
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
	      				name: '',
						describe: ''
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
      			console.log(this.categoryInfo);
      			this.$message({
					message:'添加成功',
					type:'success'
				})
      		},
			editCategory(){
				console.log(this.categoryInfo);
				this.$message({
					message:'修改成功',
					type:'success'
				})
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
		        	this.$message({
		        		message: '删除成功',
		        		type: 'success'
		        	})
		          	
		        }).catch(() => {
		           
		        });
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
	.btn_wrap{
		text-align: center;
	}
</style>