import { BillService } from '@/service'

const bill = {
    namespaced: true,

    state: {
        bills: [],
        cBill: null
    },

    actions: {
        async createBill ({ dispatch }, data) {
            await BillService.createBill(data)
            dispatch('getBills')
        },

        async getBills ({ state }) {
            const data = await BillService.getBills()
            state.bills = data.lists
            console.log('输出或者', state.bills)
        }
    },

    getters: {
        // 根据filter的参数去查询
        filtersBill(state, filters) {
            console.log('输出', state.cBill, filters)
        }
    },

    mutations: {

    }
}

export default bill;