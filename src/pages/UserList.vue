<template>
	<div class="user_list">
		<el-card class="search_card">
			<el-form :inline="true" :model="searchInfo" style="width:100%;"  label-position="right"  label-width="100px">
				<el-form-item label="用户名">
    				<el-input v-model="searchInfo.phone" placeholder="用户名"></el-input>
  				</el-form-item>
  				<!-- <el-form-item label="姓名">
    				<el-input v-model="searchInfo.name" placeholder="姓名"></el-input>
  				</el-form-item> -->
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
				<el-table-column prop="phone" label="用户名"></el-table-column>
				<el-table-column prop="password" label="密码"></el-table-column>
				<el-table-column prop="money" label="积分"></el-table-column>
				<!-- <el-table-column prop="name" label="姓名"></el-table-column> -->
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
			<div class="pagination_wrap">
  				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :page-sizes="[15, 30, 100, 200]"
  				:page-size="searchInfo.pageSize" :current-page="searchInfo.pageIndex" layout="total, sizes, prev, pager, next, jumper" :total="searchInfo.total">
			    </el-pagination>
  			</div>
		</el-card>
		<!-- 新增&修改员工模态框 -->
		<el-dialog :visible.sync="userModal" :title="userTitle" width="700px" :before-close="closeDialog">
			<el-form status-icon :model="userInfo" style="width:100%;" label-width="150px" :rules="rules" ref="ruleForm">
				<el-card class="clearfix">
					<el-form-item label="用户名(手机号码)" prop="phone">
    					<el-input v-model="userInfo.phone" placeholder="用户名"></el-input>
  					</el-form-item>

  					<!-- <el-form-item label="姓名" prop="name">
    					<el-input v-model="userInfo.name" placeholder="姓名"></el-input>
  					</el-form-item> -->
					<el-form-item label="密码" prop="password">
    					<el-input type="password" v-model="userInfo.password" placeholder="密码"></el-input>
  					</el-form-item>
					<el-form-item label="确认密码" prop="confirmPassword">
    					<el-input type="password" v-model="userInfo.confirmPassword" placeholder="确认密码"></el-input>
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
	import { SelectAllUser, AddUser, DeleteUser, UpdateUser } from '@/js/api'
	export default {
		data(){
			var validatePhone = (rule, value, callback) => {
				var reg = /^[1][0-9]{10}$/;
				if(!reg.test(value)){
					callback(new Error('用户名格式错误'));
				}
				else{
					callback();
				}
			};
			var checkPassword = (rule, value, callback) => {
		        if (value === '') {
		          	callback(new Error('请输入密码'));
		        } 
		        else {
		          	if (this.userInfo.confirmPassword !== '') {
		            	this.$refs.ruleForm.validateField('confirmPassword');
		          	}
		          	callback();
		        }
	      	};
	      	var checkConfirmPassword = (rule, value, callback) => {
		        if (value === '') {
		          	callback(new Error('请再次输入密码'));
		        } 
		        else if (value !== this.userInfo.password) {
		          	callback(new Error('两次输入密码不一致!'));
		        } 
		        else {
		          	callback();
		        }
	      	};
			return{
				userModal: false,
				userTitle: '',
				userModalType: '',
				userInfo: {
					id:'',
					name: '',
					phone: '',
					password: '',
					confirmPassword: ''
				},
				loading: false,
				searchInfo: {
					name: '',
					phone: '',
					registTime: '',
					registStartTime: '',
					registEndTime: '',
					recentLoginTime: '',
					recentLoginStartTime: '',
					recentLoginEndTime: '',
					pageSize: 15,
					pageIndex: 1,
					total: 0,
				},
				userList: [],
				rules:{
					phone: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
			            { validator: validatePhone, trigger: 'blur' }
		          	],
		          	name: [
			            { required: true, message: '请输入姓名', trigger: 'blur' },
			        ],
			        password: [
			        	{ required: true, message: '请输入密码', trigger: 'blur' },
			            { validator: checkPassword, trigger: 'blur' }
			        ],
			        confirmPassword:  [
			        	{ required: true, message: '请输入密码', trigger: 'blur' },
			            { validator: checkConfirmPassword, trigger: 'blur' }
			        ],
				}
			}
		},
		methods:{
			getUserInfoList(){
				this.loading = true;
				this.searchInfo.registStartTime = this.searchInfo.registTime?this.searchInfo.registTime[0]:'';
				this.searchInfo.registEndTime = this.searchInfo.registTime?this.searchInfo.registTime[1]:'';
				this.searchInfo.recentLoginStartTime = this.searchInfo.recentLoginTime?this.searchInfo.recentLoginTime[0]:'';
				this.searchInfo.recentLoginEndTime = this.searchInfo.recentLoginTime?this.searchInfo.recentLoginTime[1]:'';
				let params = JSON.parse(JSON.stringify(this.searchInfo));
				SelectAllUser(params).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.userList = value;
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
				this.getUserInfoList();
			},
			handleCurrentChange(val){
				this.searchInfo.pageIndex=val;
				this.getUserInfoList();
			},
			search(){
				this.getUserInfoList();
			},

			//导出
			exportExcel(){
				require.ensure([], () => {　　　　　　　　
			    const { export_json_to_excel } = require('@/vendor/Export2Excel');　　//引入文件　　　　　　
			    const tHeader = ['用户名','姓名','密码','创建时间','最近登陆时间']; //将对应的属性名转换成中文
			    const filterVal = ['phone','name','password','registTime','recentLoginTime'];//table表格中对应的属性名
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
	      				name: '',
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
				let params = JSON.parse(JSON.stringify(this.userInfo));
				this.$refs['ruleForm'].validate((valid) => {
		          	if (valid) {
		            	AddUser(params).then(data =>{
							let { errMsg, errCode, value, success, extraInfo } = data;
							if(success){
								this.$message({
									message:'添加成功',
									type:'success'
								});
								this.getUserInfoList();
							}
							else{
								this.$message({
									message:errMsg,
									type:'error'
								})
							}
						})
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });	
			},
			editUser(){
				let params = JSON.parse(JSON.stringify(this.userInfo));
				this.$refs['ruleForm'].validate((valid) => {
		          	if (valid) {
		            	UpdateUser(params).then(data =>{
							let { errMsg, errCode, value, success, extraInfo } = data;
							if(success){
								this.$message({
									message:'修改成功',
									type:'success'
								});
								this.getUserInfoList();
							}
							else{
								this.$message({
									message:errMsg,
									type:'error'
								})
							}
						})
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });	
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
		        	DeleteUser(params).then(data =>{
		        		let { errMsg, errCode, value, success, extraInfo } = data;
		        		if(success){
		        			this.$message({
				        		message: '删除成功',
				        		type: 'success'
				        	});
				        	this.getUserInfoList();
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
			},
			closeDialog(){
				this.userModal = false;
				this.$refs['ruleForm'].resetFields();
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
			this.getUserInfoList();
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
	.pagination_wrap{
		float:right;
		padding:20px 0;
	}
</style>