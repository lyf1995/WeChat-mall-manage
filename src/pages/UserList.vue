<template>
	<div class="user_list">
		<el-card class="search_card">
			<el-form :inline="true" :model="searchInfo" style="width:100%;"  label-position="right"  label-width="100px">
				<el-form-item label="用户名">
    				<el-input v-model="searchInfo.username" placeholder="用户名"></el-input>
  				</el-form-item>
  				<el-form-item label="手机号码">
    				<el-input v-model="searchInfo.phone" placeholder="手机号码"></el-input>
  				</el-form-item>
  				<el-form-item label="注册时间">
  					<el-date-picker v-model="searchInfo.registTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
  					</el-date-picker>
  				</el-form-item>
  				<el-form-item label="最近登录时间">
  					<el-date-picker v-model="searchInfo.recentLoginTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
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
				<el-button type="primary" class="operation_btn" @click.stop="userModalShow('add')">
					<i class="iconfont icon-icon--"></i>
					新增用户
				</el-button>
			</div>
			<el-table :data="userList" border style="width: 100%" v-loading="loading">
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="username" label="用户名"></el-table-column>
				<el-table-column prop="phone" label="手机号码"></el-table-column>
				<el-table-column prop="password" label="密码"></el-table-column>
				<el-table-column prop="registTime" label="创建时间"></el-table-column>
				<el-table-column prop="recentLoginTime" label="最近登陆时间"></el-table-column>
				<el-table-column label="操作" width="200" fixed="right" align="center">
      				<template slot-scope="scope">
        				<el-button size="mini" type="primary" @click.stop="userModalShow('edit',scope.row)">
        					<i class="iconfont icon-icon6" style="margin-right:5px;"></i>编辑
        				</el-button>
        				<el-button size="mini" type="danger" @click="deleteUser(scope.row)">
        					<i class="iconfont icon-shanchu" style="margin-right:5px;"></i>删除
        				</el-button>
      				</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 新增&修改员工模态框 -->
		<el-dialog :visible.sync="userModal" :title="userTitle" width="700px">
			<el-form :model="userInfo" style="width:100%;" label-width="100px">
				<el-card class="clearfix">
					<el-form-item label="用户名">
    					<el-input v-model="userInfo.username" placeholder="用户名"></el-input>
  					</el-form-item>
					<el-form-item label="手机号码">
    					<el-input v-model="userInfo.phone" placeholder="手机号码"></el-input>
  					</el-form-item>
						<el-form-item label="密码">
    					<el-input v-model="userInfo.password" placeholder="密码"></el-input>
  					</el-form-item>
						<el-form-item label="确认密码">
    					<el-input v-model="userInfo.confirmPassword" placeholder="确认密码"></el-input>
  					</el-form-item>
  					<div class="btn_wrap">
  						<el-button type="primary" v-if="userModalType=='add'" @click="addUser">添加</el-button>
  						<el-button type="primary" v-if="userModalType=='edit'" @click="editUser">保存</el-button>
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
				userModal: false,
				userTitle: '',
				userModalType: '',
				userInfo: {
					id:'',
					username: '',
					phone: '',
					password: '',
				},
				loading: false,
				searchInfo: {
					username: '',
					phone: '',
					registTime: '',
					registStartTime: '',
					registEndTime: '',
					recentLoginTime: '',
					recentLoginStartTime: '',
					recentLoginEndTime: ''
				},
				userList: [
					{
						id:'1',
						username:'张三',
						phone:'12345678901',
						password:'1111',
						registTime:'2017-01-01',
						recentLoginTime:'2017-01-01'
					}
				]
			}
		},
		methods:{
			search(){
				this.searchInfo.registStartTime = this.searchInfo.registTime[0]?this.searchInfo.registTime[0]:'';
				this.searchInfo.registEndTime = this.searchInfo.registTime[1]?this.searchInfo.registTime[1]:'';
				this.searchInfo.recentLoginStartTime = this.searchInfo.recentLoginTime[0]?this.searchInfo.recentLoginTime[0]:'';
				this.searchInfo.recentLoginEndTime = this.searchInfo.recentLoginTime[1]?this.searchInfo.recentLoginTime[1]:'';
				console.log(this.searchInfo);
			},

			//导出
			exportExcel(){
				require.ensure([], () => {　　　　　　　　
			    const { export_json_to_excel } = require('@/vendor/Export2Excel');　　//引入文件　　　　　　
			    const tHeader = ['用户名','手机号码','密码','创建时间','最近登陆时间']; //将对应的属性名转换成中文
			    const filterVal = ['username','phone','password','registTime','recentLoginTime'];//table表格中对应的属性名
			    const list = this.userList;
			    tHeader.unshift('序号');
				filterVal.unshift('index');
			    for(let i=0;i<list.length;i++){
			    	list[i].index=i+1+'';
			    }　　　　　　
			    const data = this.formatJson(filterVal, list);　　　　　
			    export_json_to_excel(tHeader, data, '用户导出excel');
			    })
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]));
			},
			//弹出新增&修改用户的模态框
      		userModalShow(type,row){
      			if(type=='add'){
      				this.userTitle='新增用户';
      				this.userModalType='add';
      				this.userModal=true;
      				this.userInfo={
	      				username: '',
						phone: '',
						password: '',
      				}
      			}
      			else if(type=='edit'){
      				this.userInfo=Object.assign({},row);
      				this.userModal=true;
      				this.userTitle='修改用户信息';
      				this.userModalType='edit';
      			}
      		},
			addUser(){
				this.$message({
					message:'添加成功',
					type:'success'
				})
			},
			editUser(){
				this.$message({
					message:'修改成功',
					type:'success'
				})
			},
			deleteUser(row){
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
	.user_list{
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