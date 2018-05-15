<template>
	<div class="commodity_detail">
		<el-tabs v-model="activeName" @tab-click="handleClick(activeName)" type="border-card" style="margin-top:10px;">
		  	<el-tab-pane label="商品信息" name="商品信息">
		  		<el-card>
					<div slot="header" class="clearfix">
					    <span>基本信息</span>
				  	</div>
					<el-form :model="commodityInfo" label-position="right"  label-width="100px" :rules="rules" ref="ruleForm" :status-icon="true">
						
						<el-form-item label="商品名称" prop="name">
							<el-input v-model="commodityInfo.name" placeholder="商品名称"></el-input>
						</el-form-item>
						<el-form-item label="商品描述" prop="subtitle">
							<el-input v-model="commodityInfo.subtitle" type="textarea" :rows="4" placeholder="商品描述"></el-input>
						</el-form-item>
						<el-form-item label="商品分类" prop="typeId">
							<el-select v-model="commodityInfo.typeId" placeholder="商品分类" style="width:100%;">
								<el-option v-for="(item, index) in typeList" :value="item.id" :label="item.typeName" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="零售价" prop="retailPrice">
							<el-input v-model="commodityInfo.retailPrice" placeholder="零售价" style="width:40%"></el-input>
							<span style="font-size: 18px;">￥</span>
						</el-form-item>
						<el-form-item label="会员价" prop="vipPrice">
							<el-input v-model="commodityInfo.vipPrice" placeholder="会员价" style="width:40%"></el-input>
							<span style="font-size: 18px;">￥</span>
						</el-form-item>
						<el-form-item label="库存" prop="stock">
							<el-input v-model="commodityInfo.stock" placeholder="库存" style="width:40%"></el-input>
							<span style="font-size: 18px;">/件</span>
						</el-form-item>
						<el-form-item label="状态" prop="status">
							<el-select v-model="commodityInfo.status" placeholder="状态" style="width:40%">
								<el-option label="未删除" value="0"></el-option>
								<el-option label="已删除" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div class="btn_wrap">
						<el-button type="primary" @click="add">添加</el-button>
					</div>
				</el-card>
		  	</el-tab-pane>
		  	<el-tab-pane label="商品图片" name="商品图片">
		  		<el-form :model="commodityInfo" label-position="right"  label-width="100px" :rules="rules" ref="ruleForm" :status-icon="true">
		  			<el-form-item label="商品主图">
						<img src="../assets/images/upload.png" @click="doClick" style="cursor:pointer;" v-if="!mainImage">
						<input ref="photo" type="file" name="photo" @change="mainImageChange" style="display:none;"/>
						<span v-if="mainImage" style="display: inline-block;width:183px;height:183px;line-height:183px;text-align:center;border: 1px dashed #ccc;">
							<img :src="mainImage" alt="" style="width:180px;height:180px;margin-top:1px;" @click="doClick">
						</span>
						
					</el-form-item>
		  		</el-form>
		  	</el-tab-pane>
		 </el-tabs>
	</div>
</template>
<script>
	import { SelectAllType, AddCommodity, UpdateMainImage } from '@/js/api'
	export default{
		data(){
			return{
				id: 0,
				mainImage:'',
				activeName: '商品信息',
				typeList: [],
				commodityInfo: {
					name:'',
					subtitle: '',
					typeId: '',
					retailPrice: '0',
					vipPrice: '0',
					stock: '0',
					status: '0',
					mageUrl:''
				},
				rules:{
					name:[
						{ required: true, message: '请输入商品名称', trigger: 'blur' },
					],
					subtitle:[
						{ required: true, message: '请输入商品描述', trigger: 'blur' },
					],
					typeId:[
						{ required: true, message: '请选择商品分类', trigger: 'blur' },
					],
					retailPrice:[
						{ required: true, message: '请输入零售价', trigger: 'blur' },
					],
					vipPrice:[
						{ required: true, message: '请输入会员价', trigger: 'blur' },
					],
					stock:[
						{ required: true, message: '请输入商品库存', trigger: 'blur' },
					],
					status:[
						{ required: true, message: '请选择商品状态', trigger: 'blur' },
					]
				},
				dialogImageUrl: '',
        		dialogVisible: false
			}
		},
		methods:{
			doClick(){
				this.$refs.photo.click();
			},
			mainImageChange(e){
				let file = e.target.files[0];           
          		let params = new FormData();
          		params.append('file1',file);
          		params.append('file2',file);
          		params.append('id',this.id);
          		UpdateMainImage(params).then(data=>{
          			let { errMsg, errCode, value, success, extraInfo } = data;
          			if(success){
          				this.$message({
							message: '上传成功',
							type: 'success'
						});
						this.mainImage = value;
          			}
          			else{
          				this.$message({
							message: '上传失败',
							type: 'error'
						})
          			}
          		})
			},
			//选项卡点击事件
			handleClick(type,tab, event) {
     		},
			//获取所有商品分类
			selectAllType(){
				SelectAllType({id: '',typeName: ''}).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.typeList = Object.assign(this.typeList,value);
					}
					else{
						this.$message({
							message: errMsg,
							type: 'error'
						})
					}
				});
			},
     		add(){
     			this.$refs['ruleForm'].validate((valid) => {
		          	if (valid) {
		          		let params = JSON.parse(JSON.stringify(this.commodityInfo));
		            	AddCommodity(params).then(data =>{
		            		let { errMsg, errCode, value, success, extraInfo } = data;
		            		if(success){
		            			this.$message({
		            				message: '添加成功',
		            				type: 'success'
		            			});
		            			this.id = value.id;
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
     		}
		},
		mounted(){
			//获取所有商品分类
			this.selectAllType();
		}
	}
</script>
<style scoped>
	.commodity_detail{
		padding-bottom: 20px;
		padding-left: 5px;
		padding-right: 5px;
		background: #fff;
	}
	.btn_wrap{
		text-align: center;
	}
</style>