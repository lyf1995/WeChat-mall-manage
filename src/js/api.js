import axios from 'axios'

axios.defaults.withCredentials=true;

export const netName = '微信商城后台管理系统';
let base = window.g.ApiUrl;

//登录
export const Login = params=>{ return axios.post(`${base}/user/login`, params).then(res => res.data).catch(error=>error); };
//查询所有用户
export const SelectAllUser = params=>{ return axios.post(`${base}/user/selectAllUser`, params).then(res => res.data).catch(error=>error); };
//新增用户
export const AddUser = params=>{ return axios.post(`${base}/user/newUser`, params).then(res => res.data).catch(error=>error); };
//批量创建用户
export const BatchAddUser = params=>{ return axios.post(`${base}/user/batchAddUser`, params).then(res => res.data).catch(error=>error); };
//删除用户
export const DeleteUser = params=>{ return axios.post(`${base}/user/delectUser`, params).then(res => res.data).catch(error=>error); };
//修改用户
export const UpdateUser = params=>{ return axios.post(`${base}/user/updateUser`, params).then(res => res.data).catch(error=>error); };
//查询所有商品分类
export const SelectAllType = params=>{ return axios.post(`${base}/commodity/selectAllType`, params).then(res => res.data).catch(error=>error); };
//新增商品分类
export const AddType = params=>{ return axios.post(`${base}/commodity/addType`, params).then(res => res.data).catch(error=>error); };
//修改商品分类
export const UpdateType = params=>{ return axios.post(`${base}/commodity/updateType`, params).then(res => res.data).catch(error=>error); };
//删除商品分类
export const DeleteType = params=>{ return axios.post(`${base}/commodity/deleteType`, params).then(res => res.data).catch(error=>error); };
//查询所有商品
export const SelectAllCommodity = params=>{ return axios.post(`${base}/commodity/selectAllCommodity`, params).then(res => res.data).catch(error=>error); };
//根据id查询商品
export const SelectCommodityById = params=>{ return axios.post(`${base}/commodity/selectCommodityById`, params).then(res => res.data).catch(error=>error); };
//新增商品
export const AddCommodity = params=>{ return axios.post(`${base}/commodity/addCommodity`, params).then(res => res.data).catch(error=>error); };
//批量创建商品
export const BatchAddCommodity = params=>{ return axios.post(`${base}/commodity/batchAddCommodity`, params).then(res => res.data).catch(error=>error); };
//修改商品
export const UpdateCommodity = params=>{ return axios.post(`${base}/commodity/updateCommodity`, params).then(res => res.data).catch(error=>error); };
//删除商品
export const DeleteCommodity = params=>{ return axios.post(`${base}/commodity/deleteCommodity`, params).then(res => res.data).catch(error=>error); };
//还原商品
export const ReductionCommodity = params=>{ return axios.post(`${base}/commodity/reductionCommodity`, params).then(res => res.data).catch(error=>error); };
//查询所有订单
export const SelectAllOrder = params=>{ return axios.post(`${base}/order/selectAllOrder`, params).then(res => res.data).catch(error=>error); };
//修改订单状态
export const ChangeOrderStatus = params =>{ return axios.post(`${base}/order/changeOrderStatus`, params).then(res => res.data).catch(error => error); };
//修改图片主图
export const UpdateMainImage = params =>{ return axios.post(`${base}/image/mainImage`, params).then(res => res.data).catch(error => error); };
//查询所有分享
export const SelectAllShare = params =>{ return axios.post(`${base}/share/selectAllShare`, params).then(res => res.data).catch(error => error); };
//根据分享id查看分享点击详情
export const SelectShareUserByShareId = params =>{ return axios.post(`${base}/share/selectShareUserByShareId`, params).then(res => res.data).catch(error => error); };
//获取返利设置
export const GetRebateInfo = params =>{ return axios.post(`${base}/rebate/getRebateInfo`, params).then(res => res.data).catch(error => error); };
//修改返利设置
export const UpdateRebate = params =>{ return axios.post(`${base}/rebate/updateRebate`, params).then(res => res.data).catch(error => error); };