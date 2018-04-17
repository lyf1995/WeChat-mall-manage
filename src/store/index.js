import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state={
	localAccount:{},
	apiHead:{},
}

const mutations={
	initAccount(state){
		state.localAccount = {};
	},
	keepAccount(state,localAccount){
		state.localAccount = localAccount;
	},
	initApiHead(state){

	}
}


//通过保存到localStorage来解决vuex中的数据页面刷新丢失的问题
for(let item in state){
	localStorage.getItem(item)?state[item] = JSON.parse(localStorage.getItem(item)): false;
}

export default new Vuex.Store({
	state,
	mutations,
});