import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/pages/Home'], resolve);
const CommodityList = resolve => require(['@/pages/CommodityList'], resolve);
const OrderList = resolve => require(['@/pages/OrderList'], resolve);
const UserList = resolve => require(['@/pages/UserList'], resolve);
const CommodityDetail = resolve => require(['@/pages/CommodityDetail'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/commodityManage'
    },
    {
    	path:'/login',
    	name:'登录',
    },
    {
    	path: '/commodityManage',
    	name: '商品管理',
    	menuShow: true,
    	hasChild: true,
        component: Home,
    	iconfont: 'iconfont icon-shangpinguanli',
    	redirect: '/commodityManage/commodityList',
    	children:[
    		{
    			path: '/commodityManage/commodityList',
    			name: '商品列表',
                component: CommodityList,   
    			menuShow: true,
    		},
            {
                path: '/commodityManage/commodityDetail',
                name: '商品详情',
                component: CommodityDetail,   
                menuShow: false,
            },
    		{
    			path: '/commodityManage/commodityClass',
    			name: '商品分类',
    			menuShow: true,
    		}
    	]
    },
    {
    	path: '/orderManage',
    	name: '订单管理',
        component: Home,
    	menuShow: true,
    	hasChild: true,
    	iconfont: 'iconfont icon-dingdanguanli',
    	children:[
    		{
    			path: '/orderManage/orderList',
    			name: '订单列表',
    			menuShow: true,
                component: OrderList
    		},
    	]
    },
    {
    	path: '/userManage',
    	name: '用户管理',
        component: Home,
    	menuShow: true,
    	hasChild: true,
    	iconfont: 'iconfont icon-Management',
    	children:[
    		{
    			path: '/userManage/userList',
    			name: '用户列表',
                component: UserList,
    			menuShow: true,
    		},
    		{
    			path: '/userManage/batchAddUser',
    			name: '批量创建用户',
    			menuShow: true,
    		}
    	]
    },
    {
    	path: '/shareManage',
    	name: '分享管理',
        component: Home,
    	menuShow: true,
    	hasChild: true,
    	iconfont: 'iconfont icon-fenxiang',
    	children:[
    		{
    			path: '/shareManage/shareList',
    			name: '分享列表',
    			menuShow: true,
    		}
    	]
    },
    {
    	path: '/statisticalReport',
    	name: '统计报表',
        component: Home,
    	menuShow: true,
    	hasChild: false,
    	iconfont: 'iconfont icon-tongji',
    }
  ]
})
