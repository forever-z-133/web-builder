import axios from 'axios';
import { baseUrl } from '@/config/config';
import { getLocal } from '@/utils/utils';

/**
 * 公共请求方法
 */
function request(method, url, params, options = {}) {
  // 先统一化入参
  if (params === null) params = void 0;
  if (method && typeof method === 'object') {
    url = method.url;
    params = {};
    options = method;
    method = method.method;
  }
  if (!/https?:\/\//.test(url)) url = baseUrl + url;

  // 构造 axios 所需入参
  const opts = { url };
  const token = getLocal('token');
  opts.headers = {
    Authorization: token
  };
  // ---- 不需要带上 token
  if (!token || options.noToken) {
    delete options.noToken;
    delete opts.headers.Authorization;
  }
  // ---- 不需要加载中动画
  if (options.noLoading) {
    //
  }

  // 开始请求
  switch (method.toLowerCase()) {
    case 'get':
      return axios({ ...opts, method: 'GET', params, otherParams: options }).catch(() => { });
    case 'post':
      return axios({
        ...opts,
        method: 'POST',
        data: { ...params },
        otherParams: options
      }).catch(() => { });
    default:
      return axios({ ...opts, ...options }).catch(() => { });
  }
}

/**
 * 返回数据时拦截
 */
axios.interceptors.response.use(
  function (response) {
    const { data = {} } = response || {};
    // 统一 code 报错
    if (data.code) console.error(data.message || '未知错误');
    return data;
  },
  function (error) {
    // 接口 fail 报错
    const errorMsg = error.response.data ? error.response.data.msg : '';
    if (error.response.status === 401) {
      console.error('您的帐号已在其他地方登录,请重新登录');
    } else if (error.response.status === 405) {
      console.error(errorMsg || '请联系管理员确认您的权限');
    } else if (error.response.status === 500) {
      console.error('服务器内部错误,请联系管理员');
    } else {
      console.error('请联系管理员检查该问题');
    }
    return Promise.reject(error);
  }
);

export default request;
