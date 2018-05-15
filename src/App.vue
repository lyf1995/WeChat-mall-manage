<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td { 
		margin: 0; 
		padding: 0; 
	}
	#app {
	  	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	  	-webkit-font-smoothing: antialiased;
	  	-moz-osx-font-smoothing: grayscale;
	  	color: #2c3e50;
	}
	.clearfix::after{
		content: '';
		display: block;
		clear: both;
		height: 0;
		visibility: hidden;
	}
	 /*修改滚动条样式*/

	  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
	  ::-webkit-scrollbar
	  {
	    width: 8px;
	    height: 8px;
	  }
	  /*定义滑块 内阴影+圆角*/
	  ::-webkit-scrollbar-thumb
	  {
	    border-radius: 10px;
	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	    background-color: #1D8CE0;
	  }

	  /* element-defined-css*/
	  .el-menu{
	    width:160px !important;
	  }
	  .el-submenu .el-menu-item,.el-submenu__title{
	    width:160px !important;
	    min-width:160px !important;
	    box-sizing: border-box !important;
	  }
	  .el-submenu__title{
	    color:#fff !important;
	  }
	  .is-opened .el-menu li{
	    background-color:#1f2d3d !important;
	  }
	  .el-submenu__title:hover,.el-menu-item:hover,.is-opened .el-menu li:hover{
	    background-color: #48576a !important;
	  }
	  .el-table th {
	    white-space: nowrap !important;
	    overflow: hidden !important;
	    background-color: #eef1f6 !important;
	    text-align: center !important;
	    color:black !important;
	  }
	  .el-table td, .el-table th.is-leaf{
	    border-bottom: 1px solid #dfe6ec !important;
	  }
	  .el-table--border td, .el-table--border th{
	    border-right: 1px solid #dfe6ec !important;
	  }
	  .el-table--border th, .el-table__fixed-right-patch{
	      border-bottom: 1px solid #dfe6ec !important;
	  }
</style>
