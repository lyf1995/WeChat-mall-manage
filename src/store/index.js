import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state={
	accountInfo:{},
	apiHead:{},
}

const mutations={
	initAccount(state){
		state.accountInfo = {};
	},
	keepAccount(state,accountInfo){
		state.accountInfo = accountInfo;
	},
	initApiHead(state){

	}
}


//通过保存到sessionStorage来解决vuex中的数据页面刷新丢失的问题
for(let item in state){
	sessionStorage.getItem(item)?state[item] = JSON.parse(sessionStorage.getItem(item)): false;
}

export default new Vuex.Store({
	state,
	mutations,
});