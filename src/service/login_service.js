import Resource from '../lib/resource'

class LoginService {
  async login (username, password) {
    const resp = await Resource.post({
      resource: 'login',
      data: {
        username: username,
        password: password
      }
    })

    return resp.data
  }
  async register (username, password) {
    const resp = await Resource.put({
      resource: 'register',
      data: {
        username: username,
        password: password
      }
    })
    return resp
  }
}
let LoginSer = new LoginService();
export default LoginSer;
