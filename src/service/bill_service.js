import Resource from '../lib/resource'

class BillService{
    async createBill(data) {
        const resp = await Resource.put({
            resource: 'bill/bill',
            data: data
        })

        return resp
    }

    async getBills(time1, time2) {
        const resp = await Resource.get({
            resource: 'bill/bills',
            data: {
                time1: time1,
                time2: time2
            }
        })

        return resp.data
    }
}
let BillSer = new BillService();
export default BillSer
