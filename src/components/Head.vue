<template>
	<el-row class="head bg-blue">
		<el-col :span="24" style="height:100%">
			<div class="net-title">
				{{netName}}
			</div>
			<div class="exit">
				<a href="javascript:;" @click="exit"><i class="el-icon-upload2 turn"></i>退出</a>
			</div>
			<div class="login-info">
				<span class="welcome">欢迎您</span>
				<span>{{username}}</span>
			</div>
			<div class="now-time">
				<span>{{nowTime}}</span>
			</div>
		</el-col>
	</el-row>
</template>
<script>
	import { netName ,Logout} from '@/js/api.js'

	export default{
		data(){
			return{
				netName:netName,
				username:'admin',
				nowTime:'',
			}
		},
		methods:{
			exit(){
				// var _this = this;

				// this.$confirm('确认退出吗?', '提示', {
				// 	type: 'info'
				// }).then(() => {
				// 	sessionStorage.removeItem('access-user');
				// 	Logout({}).then(data =>{
				// 		let { errorMsg, errorCode, value, extraInfo, success } = data;
				// 		success = true;
				// 		if(success){
				// 			_this.$router.push('/login');
				// 		}
				// 		else{
				// 			_this.$message({
				// 				message: errorMsg,
				// 				type: 'error'
				// 			});
				// 		}
				// 	});
				// }).catch(() => {

				// });
				this.$router.push('/login');
			},
			showTime(){
				var date=new Date();
				var year=date.getFullYear();
				var month=date.getMonth()+1;
				if(month<=9){
					month="0"+month;
				}
				var day=date.getDate();
				if(day<=9){
					day="0"+day;
				}
				var hours=date.getHours();
				if(hours<=9){
					hours="0"+hours;
				}
				var minutes=date.getMinutes();
				if(minutes<=9){
					minutes="0"+minutes;
				}
				var seconds=date.getSeconds();
				if(seconds<=9){
					seconds="0"+seconds;
				}
				this.nowTime=year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
			}
		},
		mounted:function(){
			this.showTime();
			var _this=this;
			setInterval(_this.showTime
			,1000);
		}
	}
</script>
<style scoped>
	.head{
		min-height: 60px;
		line-height:60px;
	}
	.bg-blue{
		background: #1D8CE0;
	}
	.net-title{
		float:left;
		margin-left:20px;
		height:100%;
		color:#fff;
		font-weight: bold;
		font-size:18px;
	}
	.welcome{
		color:#fff;
		font-style: italic;
	}
	.login-info{
		float:right;
		height:100%;
		margin-right:20px;
		font-size:18px;
	}
	.exit{
		float:right;
		margin-right:20px;
		color:#fff;
		font-size:14px;
	}
	.now-time{
		float:right;
		margin-right:20px;
		color:#fff;
	}
	.turn{
		transform:rotate(90deg);
		-ms-transform:rotate(90deg);
		-moz-transform:rotate(90deg);
		-webkit-transform:rotate(90deg);
		-o-transform:rotate(90deg);
	}
	a{
		text-decoration: none;
		color:white;
	}
</style>