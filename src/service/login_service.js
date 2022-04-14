import Resource from '../lib/resource'

class TestService {
  async login (username, password) {
    const resp = await Resource.put({
      resource: 'login/login',
      data: {
        username: username,
        password: password
      }
    })

    return resp.data
  }
}
let TestSer = new TestService();
export default TestSer;
