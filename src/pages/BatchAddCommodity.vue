<template>
	<div class="batchAdd">
		<div class="batchAdd-header">
			<span>批量创建用户:</span>
			<input ref="upload" type="file" @change="importFile(this)" name="" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;" />
			<el-button type="primary" class='upButton' @click="showChooseFile">选择文件</el-button>
		</div>
		<el-table :data="commodityList"   @selection-change="selsChange" style="width: 100%;" :height="tableHeight" border>
			<el-table-column type="selection" fixed></el-table-column>
			<el-table-column type="index" label="序号" width="50"></el-table-column>
			<el-table-column prop="name" label="商品名称" ></el-table-column>
			<el-table-column prop="subtitle" label="商品描述" ></el-table-column>
			<el-table-column prop="marketPrice" label="零售价" width="80"></el-table-column>
			<el-table-column prop="vipPrice" label="会员价" width="80"></el-table-column>
			<el-table-column prop="stock" label="库存" width="80"></el-table-column>
			<el-table-column prop="categoryName" label="商品分类" width="100"></el-table-column>
		</el-table>
		<div class="batch-footer">
			<el-button type="primary" @click="batchImport" :disabled="selections.length==0">批量导入</el-button>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			var _this=this;
			window.onresize=function(){
				var a=document.documentElement.clientHeight-255;
				_this.tableHeight=a;
			};
			return{
				tableHeight:0,
				selections: [], //列表选中行
				commodityList:[],
			}
		},
		methods:{
			//显示选择文件
			showChooseFile(){
				this.$refs.upload.click();
			},
			//导入excel表
			importFile(obj){
				let _this = this;
				let inputDOM = this.$refs.inputer;
				// 通过DOM取文件数据

				this.file = event.currentTarget.files[0];
				var rABS = false; //是否将文件读取为二进制字符串
				var f = this.file;

				var reader = new FileReader();
				//if (!FileReader.prototype.readAsBinaryString) {
				FileReader.prototype.readAsBinaryString = function(f) {
					var binary = "";
					var rABS = false; //是否将文件读取为二进制字符串
					var pt = this;
					var wb; //读取完成的数据
					var outdata;
					var reader = new FileReader();
					reader.onload = function(e) {
						var bytes = new Uint8Array(reader.result);
						var length = bytes.byteLength;
						for(var i = 0; i < length; i++) {
							binary += String.fromCharCode(bytes[i]);
						}
						var XLSX = require('xlsx');

						if(rABS) {
							wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
								type: 'base64'
							});
						} else {
							wb = XLSX.read(binary, {
								type: 'binary'
							});
						}
						outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
						console.log(outdata);
						_this.commodityList=_this.dateTransition(outdata);
					}
					reader.readAsArrayBuffer(f);
				}
				//}
				if(rABS) {
					reader.readAsArrayBuffer(f);
				} else {
					reader.readAsBinaryString(f);
				}

			},
			dateTransition(outdata){
				let commodityListArr=[];
				var commodityObj={};
				for(var i=0;i<outdata.length;i++){
					commodityObj={};
					for(var key in outdata[i]){
				      	if(key=='商品名称'){
				      		commodityObj['name']=outdata[i][key];
				      	}
				      	else if(key=='商品描述'){
				      		commodityObj['subtitle']=outdata[i][key];
				      	}
				      	else if(key=='零售价'){
				      		commodityObj['marketPrice']=outdata[i][key];
				      	}
				      	else if(key=='会员价'){
				      		commodityObj['vipPrice']=outdata[i][key];
				      	}
				      	else if(key=='库存'){
				      		commodityObj['stock']=outdata[i][key];
				      	}
				      	else if(key=='商品分类'){
				      		commodityObj['categoryName']=outdata[i][key];
				      	}
				    }
					commodityListArr.push(commodityObj);
				}
				return commodityListArr;
			},
			//列表选中
			selsChange(selections){
				this.selections=selections;
			},
			//批量导入
			batchImport(){
				console.log(this.commodityList);
			}	
		},
		created(){
			this.tableHeight=document.documentElement.clientHeight-255;
		}
	}
</script>
<style scoped>
	.batchAdd{
		padding:0 10px;
		height:100%;
		background-color: #fff;
	}
	.batchAdd-header{
		padding:20px 0;
	}
	.batch-footer{
		margin:10px 0 5px 20px;
	}
</style>
