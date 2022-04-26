import { BillService } from '@/service'
import moment from "moment";

const bill = {
    namespaced: true,

    state: {
        bills: [],
        allBills: [],
        cBill: null,
        billInfo: null
    },

    actions: {
        async createBill ({ dispatch }, data) {
            await BillService.createBill(data)
            dispatch('getBills')
        },

        async getBills ({ state, getters }) {
            const data = await BillService.getBills()
            state.allBills = data.lists
            // 处理账单数据
            const day2bills = []
            data.lists.forEach((bill) => {
                const date = new Date(bill.accounting_date *1000)
                bill.accounting_date = moment(date).format("YYYY年MM月DD日")
                bill.date = moment(date).format("YYYY年MM月DD日 hh:mm")
                // bill.month = date.getMonth() + 1
                // bill.day = date.getDate()
                bill.time = moment(date).format("hh:mm")
                bill.week = date.getDay()
                bill.amount = bill.amount / 100  // 格式不传小数
                if (day2bills.length > 0) {
                    const index = day2bills.findIndex((item) => item.createTime === bill.accounting_date)
                    if (index >= 0) {
                        day2bills[index].bills.push(bill)
                        console.log('存在')
                    } else {
                        day2bills.push({
                            createTime: bill.accounting_date,
                            bills: [bill]
                        })
                    }
                } else {
                    day2bills.push({
                        createTime: bill.accounting_date,
                        bills: [bill]
                    })
                }
            })
            state.bills = day2bills
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
        activeBill(state, bill) {
            state.billInfo = bill
        }
    }
}

export default bill;
