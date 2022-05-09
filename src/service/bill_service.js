import Resource from '../lib/resource'

class BillService{
    async createBill(data) {
        const resp = await Resource.put({
            resource: 'bill/bill',
            data: data
        })

        return resp
    }

    async updateBill(data) {
        const resp = await Resource.post({
            resource: 'bill/bill',
            data: data
        })

        return resp
    }

    async getBills(time1, time2) {
        const resp = await Resource.get({
            resource: 'bill/bills',
            data: {
                user_id: localStorage.getItem('user_id'),
                time1: time1,
                time2: time2
            }
        })

        return resp.data
    }

    async deleteBill(id) {
        const resp = await Resource.delete({
            resource: 'bill/bill',
            data: {
                id: id
            }
        })

        return resp
    }
}
let BillSer = new BillService();
export default BillSer
