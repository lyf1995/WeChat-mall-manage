<template>
	<div class="rebate_set">
		<el-card>
			<el-form :inline="true" :model="rebateInfo" style="width:100%;"  label-position="right"  label-width="150px" :rules="rules" ref="ruleForm">
				<el-form-item label="注册返利积分" prop="registRebate">
    				<el-input v-model="rebateInfo.registRebate" type="number" placeholder="注册返利" style="width:90%;"></el-input>￥
  				</el-form-item><br>
  				<el-form-item label="购买返利比" prop="buyRebate">
  					<el-input v-model="rebateInfo.buyRebate" type="number" placeholder="购买返利比" style="width:90%;"></el-input>%
  				</el-form-item>
  				<br>
  				<el-button type="primary" style="margin-left:120px;" @click="update">
					<i class="iconfont icon-icon-chaxun" style="margin-right:5px;"></i>
					保存
				</el-button>
			</el-form>
		</el-card>
	</div>
</template>
<script>
	import { GetRebateInfo, UpdateRebate} from '@/js/api'
	export default {
		data(){
			return{
				rebateInfo: {
					id: 1,
					registRebate: 0,
					buyRebate: 0
				},
				rules:{
					registRebate: [
						{ required: true, message: '请输入数字', trigger: 'blur' },
		          	],
		          	buyRebate: [
			            { required: true, message: '请输入数字', trigger: 'blur' },
			        ],
				}
			}
		},
		methods:{
			getRebateInfo(){
				GetRebateInfo({}).then(data => {
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.rebateInfo = value;
					}
					else{
						this.$message({
							message: '查询异常',
							type: 'error'
						})
					}
				})
			},
			update(){
				let _this = this;
				let params = JSON.parse(JSON.stringify(this.rebateInfo));
				this.$refs['ruleForm'].validate((valid) => {
		          	if (valid) {
		          		_this.$confirm('是否确定修改?', '提示', {
				          	confirmButtonText: '确定',
			         	 	cancelButtonText: '取消',
				          	type: 'warning'
				        }).then(() => {
				        	UpdateRebate(params).then(data =>{
				        		let { errMsg, errCode, value, success, extraInfo } = data;
				        		if(success){
				        			_this.$message({
				        				message: '修改成功',
				        				type: 'success'
				        			})
				        		}
				        		else{
				        			_this.$message({
				        				message: '修改失败',
				        				type: 'error'
				        			})
				        		}
				        	});
				        }).catch(() =>{

				        })
		          	}
		          	else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });	
			}
		},
		mounted(){
			this.getRebateInfo();
		}
	}
</script>
<style scoped>
	.rebate_set{
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