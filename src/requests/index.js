import SingletonRequest from '@/utils/singleton'
import request from './axios'

// 单例式请求，回调到处放，排队等接口
const singleton = SingletonRequest.getInstance()

// 登录
export const requestLogin = params => request('post', 'api/v1/admin/login', params, { noToken: true })
// 获取 token
singleton.set('getToken', () => request('get', 'api/v1/getToken'))
export const getToken = () => singleton.get('getToken')
// 获取登录人信息
export const getUserinfo = () => request('get', 'api/v1/userinfo/user')
// 提交修改密码
export const editPass = params => request('post', 'api/v1/userinfo/modifyPass', params)
