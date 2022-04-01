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

    localStorage.setItem('jwt', resp.data.token)
  }
}
let TestSer = new TestService();
export default TestSer;
