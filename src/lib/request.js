import axios from 'axios'
// import qs from 'qs'

/** 1.创建axios实例 **/
const service = axios.create({
  // 公共接口
  baseURL: 'http://localhost:8080', // process.env.BASE_API,
  // 超时时间
  timeout: 6000
})

/*** 2.请求拦截器,发送请求前做一些处理，配置请求头、设置token等 ***/
service.interceptors.request.use(config =>{
  // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
  // console.log('config。data***', config.data)
  // config.data = JSON.stringify(config.data) // 数据转化为json字符串格式
  // config.data = qs.stringify(config.data) // 使用qs转化
  // console.log('输出这个config', config)
  const token = localStorage.getItem("jwt")
  if (token) {
    config.headers['AUTHORIZATION'] = token // 每个请求携带自定义的 token
  }

  // 配置请求头
  config.headers = {
    'content-type':'application/x-www-form-urlencoded' //配置请求头
  }

  return config
}, error => {
  return Promise.reject(error)
})

/**** 3.响应拦截器 接收到响应数据并成功后的一些共有的处理，关闭loading等 ****/
service.interceptors.response.use(response => {
  return response.data
}, error => {
  /***** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        window.location.href = "/NotFound"
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    error.message = '连接服务器失败'
  }

  /***** 处理结束 *****/
  return Promise.resolve(error.response)
})

export {
  service as request
}
