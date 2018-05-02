<template>
	<div class="commodity_detail">
		<el-tabs v-model="activeName" @tab-click="handleClick(activeName)" type="border-card" style="margin-top:10px;">
		  	<el-tab-pane label="商品信息" name="商品信息">
				<el-card>
					<div slot="header" class="clearfix">
					    <span>基本信息</span>
				  	</div>
					<el-form :model="commodityInfo" label-position="right"  label-width="100px">
						<el-form-item label="商品名称">
							<el-input v-model="commodityInfo.name" placeholder="商品名称"></el-input>
						</el-form-item>
						<el-form-item label="商品分类">
							<el-select :model="commodityInfo.categoryName" placeholder="商品分类" style="width:100%;">
								<el-option label="分类一" value="分类一"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="零售价">
							<el-input v-model="commodityInfo.marketPrice" placeholder="零售价" style="width:40%"></el-input>
							<span style="font-size: 18px;">￥</span>
						</el-form-item>
						<el-form-item label="会员价">
							<el-input v-model="commodityInfo.vipPrice" placeholder="会员价" style="width:40%"></el-input>
							<span style="font-size: 18px;">￥</span>
						</el-form-item>
						<el-form-item label="库存">
							<el-input v-model="commodityInfo.stock" placeholder="库存" style="width:40%"></el-input>
							<span style="font-size: 18px;">/件</span>
						</el-form-item>
						<el-form-item label="状态">
							<el-select v-model="commodityInfo.status" placeholder="状态" style="width:40%">
								<el-option label="未删除" value="未删除"></el-option>
								<el-option label="已删除" value="已删除"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div class="btn_wrap">
						<el-button type="primary">保存</el-button>
					</div>
				</el-card>
		  	</el-tab-pane>
		  	<el-tab-pane label="商品详情" name="商品详情">
		  	 	<el-card>
		  	 		<div slot="header" class="clearfix">
					    <span>商品详情</span>
				  	</div>
				  	<div>
				  		<span>商品主图</span>
				  		<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false">
						  <img v-if="commodityInfo.imageUrl" :src="commodityInfo.imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
				  	</div>
		  	 	</el-card>
		  	</el-tab-pane>
		</el-tabs>

	</div>
</template>
<script>
	export default{
		data(){
			return{
				activeName: '商品信息',
				commodityInfo: {
					name:'',
					categoryName: '',
					marketPrice: '0',
					vipPrice: '0',
					stock: '0',
					status: '未删除',
					mageUrl:''
				},
			}
		},
		methods:{
			//选项卡点击事件
			handleClick(type,tab, event) {
     		},
		},
		mounted(){

		}
	}
</script>
<style scoped>
	.commodity_detail{
		padding-bottom: 20px;
		background: #fff;
	}
	.btn_wrap{
		text-align: center;
	}
</style>