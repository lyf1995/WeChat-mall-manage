import axios from 'axios'

export const netName = '微信商城后台管理系统';
let base = window.g.ApiUrl;

//登录
export const Login = params=>{ return axios.post(`${base}/user/login`, params).then(res => res.data).catch(error=>error); };
//查询所有用户
export const SelectAllUser = params=>{ return axios.post(`${base}/user/selectAllUser`, params).then(res => res.data).catch(error=>error); };
//新增用户
export const AddUser = params=>{ return axios.post(`${base}/user/newUser`, params).then(res => res.data).catch(error=>error); };
//删除用户
export const DeleteUser = params=>{ return axios.post(`${base}/user/delectUser`, params).then(res => res.data).catch(error=>error); };
//修改用户
export const UpdateUser = params=>{ return axios.post(`${base}/user/updateUser`, params).then(res => res.data).catch(error=>error); };