import axios from 'axios'

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
//新增商品分类
export const AddCommodity = params=>{ return axios.post(`${base}/commodity/addCommodity`, params).then(res => res.data).catch(error=>error); };
//修改商品分类
export const UpdateCommodity = params=>{ return axios.post(`${base}/commodity/updateCommodity`, params).then(res => res.data).catch(error=>error); };
//删除商品分类
export const DeleteCommodity = params=>{ return axios.post(`${base}/commodity/deleteCommodity`, params).then(res => res.data).catch(error=>error); };