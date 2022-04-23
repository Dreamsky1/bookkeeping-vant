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

  async createTag (name, createdBy, state) {
    const resp = await Resource.put({
      resource: 'category/categories',
      data: {
        name: name,
        image: createdBy,
        type_id: 12,
        state: state
      }
    })

    return resp
  }

  async createTypeCategory (name) {
    const resp = await Resource.put({
      resource: 'category/type/category',
      data: {
        name: name
      }
    })

    return resp
  }

  async getTypeCategory () {
    const resp = await Resource.get({
      resource: 'category/type/category',
      data: {
      }
    })

    return resp
  }

  async getTags () {
    const resp = await Resource.get({
      resource: 'category/categories',
      data: {
        name: '李白'
      }
    })

    return resp
  }

  async createBill () {
    const resp = await Resource.put({
      resource: 'bill/bill',
      data: {
        type_id: 1,
        category_id: 11,
        amount: 12,
        remark: "是第一个"
      }
    })

    return resp
  }

  async updateBill () {
    const resp = await Resource.post({
      resource: 'bill/bill',
      data: {
        id: 1,
        type_id: 1,
        category_id: 9,
        amount: 100,
        remark: "第二个"
      }
    })

    return resp
  }

  async getBill () {
    const resp = await Resource.get({
      resource: 'bill/bills',
      data: {}
    })

    return resp
  }
}
let TestSer = new TestService();
export default TestSer;
