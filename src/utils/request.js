import axios from 'axios'

const services = axios.create({
  baseURL: '/api',
  // 指定请求超时的毫秒数
  timeout: 1000 * 10, // 接口超时时间  10秒
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false
})

// 请求拦截
services.interceptors.request.use(
  (config) => {
    /**
     * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
     * const token = getToken()
     * if (token) {
     *  config.headers.token = token
     * }
     */

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { code, data, message } = response.data
    if (code === 200) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  (error) => {
    let message = ''
    const status = error.response?.status
    switch (status) {
      case 401:
        message = 'token失效，请重新登录'
        // 这里写退出登录逻辑
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器繁忙'
        break
      default:
        message = '网络链接故障'
    }
    Message.error(message)
    return Promise.reject(error)
  }
)
export default services
