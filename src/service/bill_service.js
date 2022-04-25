import Resource from '../lib/resource'

class BillService{
    async createBill(data) {
        const resp = await Resource.put({
            resource: 'bill/bill',
            data: data
        })

        return resp
    }

    async getBills() {
        const resp = await Resource.get({
            resource: 'bill/bills',
            data: {}
        })

        return resp.data
    }
}
let BillSer = new BillService();
export default BillSer
