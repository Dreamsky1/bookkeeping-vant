import { request } from "./request";

const defaultHost = '/api'

// 请求的方式 option 中的参数 {resource: login/login, data: {id: 1}}
const resource = {
  async get(options) {
    const url = getUrl(options.resource)
    const param = buildArgs(options.data)
    const config = {
      method: 'get',
      url: url
    }
    if (param) config.url = url + '?' + param
    return request(config)
  },

  async put(options) {
    const url = getUrl(options.resource)
    const param = buildArgs(options.data)
    const config = {
      method: 'put',
      url: url
    }
    if (param) config['data'] = param
    return request(config)
  },

  async post(options) {
    const url = getUrl(options.resource)
    const param = buildArgs(options.data)
    const config = {
      method: 'post',
      url: url
    }
    if (param) config['data'] = param
    console.log('输出这个config', config)
    return request(config)
  },

  async delete(options) {
    const url = getUrl(options.resource)
    const param = buildArgs(options.data)
    const config = {
      method: 'delete',
      url: url
    }
    if (param) config['data'] = param
    return request(config)
  }
}

let buildArgs = function(args) {
  var mergedArgs = Object.assign({}, args)
  var argList = []

  if (mergedArgs) {
    Object.keys(mergedArgs).forEach((key) => {
      argList.push(key + '=' +encodeURIComponent(mergedArgs[key]))
    })
  }

  return argList.join('&')
}

const getUrl = function (resource) {
  // const resourceArr = resource.split(':')
  // const service = resourceArr[0]
  // const endpoint = resourceArr[1].replace('.', '/')

  return `${defaultHost}/${resource}`
}

export default resource;
