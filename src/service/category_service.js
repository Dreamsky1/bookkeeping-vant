import Resource from '../lib/resource'

class CategoryService {
  async getCategories () {
    const resp = await Resource.get({
      resource: 'category/type/categories',
      data: {}
    })

    return resp.data
  }

  async createCategory (data) {
    const resp = await Resource.put({
      resource: 'category/category',
      data: {
        name: data.name,
        image: data.image,
        typeId: data.typeId,
        state: 1
      }
    })

    return resp
  }
}

let CategorySer = new CategoryService();
export default CategorySer
