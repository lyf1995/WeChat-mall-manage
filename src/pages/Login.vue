<template >
	<el-row class="bg login">
		<el-row>
			<el-col :span="24"><div class="grid-content" style="text-align:center;margin-top:5%;font-size:40px; color:#ffff00">微信商城后台管理系统</div></el-col>
		</el-row>
		<el-form ref="account" :model="account" :rules="rules" label-position="left" label-width="0px"	class="demo-ruleForm login-container">
			<h3 class="title">系统登录</h3>
			<el-form-item prop="phone">
				<el-input type="text" v-model="account.phone" auto-complete="off" placeholder="账号" @keyup.native="enterLogin($event)"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" v-model="account.password" auto-complete="off" placeholder="密码" @keyup.native="enterLogin($event)"></el-input>
			</el-form-item>
			<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
			<el-form-item style="width:100%;">
				<el-button type="primary" style="width:100%;" @click="login">登录</el-button>
			</el-form-item>
		</el-form>
	</el-row>
</template>

<script>
	import {Login} from '@/js/api'
	export default {
		data() {
			return {
				account: {
					phone: '',
					password: ''
				},
				rules: {
					phone: [
						{required: true, message: '请输入账号', trigger: 'blur'},
					],
					password: [
						{required: true, message: '请输入密码', trigger: 'blur'},
					]
				},
				checked: true
			};
		},
		methods: {
			login(){
				var _this = this;
				var params = JSON.parse(JSON.stringify(_this.account));
				params.type = 0;
				this.$refs.account.validate(function(valid){
					if (valid) {
						Login(params).then(data=>{
							let {errMsg, errCode, value, extraInfo, success} = data;
							if(success){
								_this.$store.commit('keepAccount',value);
								if(_this.checked){
									localStorage.setItem('localAccount', JSON.stringify(_this.account));
								}else{
									localStorage.removeItem('localAccount');
								}
								_this.$router.push({path:'/commodityManage'});
							}
							else{
								_this.$message({
									message: errMsg,
									type: 'error'
								});
							}
						});
					}
					else{
						console.log('submit error');
					}
				})
			},
		 	enterLogin(ev){ 
	            if(ev.keyCode==13){
	              	this.login();
	          	}
            }
		},
		mounted: function () {
			let localAccount = JSON.parse(localStorage.getItem('localAccount'));
			if(localAccount){
				this.account.phone = localAccount.phone;
				this.account.password = localAccount.password;
			}
		},
	}
</script>


<style>
	.bg{
		height: 100%;
		background-size: cover;
		background: black;
		/*background-image:url(../assets/images/sunshine.png);*/
		background-repeat:no-repeat;
		background-position:center;
		background-attachment:fixed;
	}
	.login .el-form{
		width: 350px;
		height: 295px;
		margin: 5% auto 0;
		background: #fff;
		padding: 35px 35px 15px;
	}
	.title{
		height: 25px;
		margin-bottom: 40px;
		text-align: center;
	}
	.remember{
		margin-bottom: 35px;
	}
</style>

