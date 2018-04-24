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

</style>
