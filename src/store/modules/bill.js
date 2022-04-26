import { BillService } from '@/service'

const bill = {
    namespaced: true,

    state: {
        bills: [],
        allBills: [],
        cBill: null
    },

    actions: {
        async createBill ({ dispatch }, data) {
            await BillService.createBill(data)
            dispatch('getBills')
        },

        async getBills ({ state, getters }) {
            const data = await BillService.getBills()
            state.allBills = data.lists
            state.bills = data.lists
            // 处理账单数据
            getters.filtersBill
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
