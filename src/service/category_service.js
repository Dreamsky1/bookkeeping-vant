import Resource from '../lib/resource'

class CategoryService {
  async getCategories () {
    try {
      const resp = await Resource.get({
        resource: 'category/type/categories',
        data: {}
      })

      return resp.data
    } catch (e) {
      console.log('跟哥几个开裆裤')
    }
  }

  async createCategory (data) {
    const resp = await Resource.put({
      resource: 'category/category',
      data: {
        name: data.name,
        image: data.image,
        type_id: data.typeId,
        state: 1
      }
    })

    return resp
  }
}

let CategorySer = new CategoryService();
export default CategorySer
