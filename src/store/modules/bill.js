import { BillService } from '@/service'
import moment from "moment";
import util from '../../lib/util'

const bill = {
    namespaced: true,

    state: {
        bills: [],
        allBills: [],
        cBill: null,
        billInfo: null,
        monthExpense: 0,
        monthIncome: 0,
        month: new Date().getMonth() + 1,
        categoryId2bills: [],
        pieData: []
    },

    actions: {
        async createBill ({ dispatch }, data) {
            await BillService.createBill(data)
            dispatch('getBills')
        },

        async getBills ({ state }, month) {
            if (month) {
                state.month = month
            }
            state.monthExpense = 0
            state.monthIncome = 0
            const { startTime, endTime } = util.currentMonthRange(state.month)
            const data = await BillService.getBills(startTime, endTime)
            state.allBills = data.lists
            // 处理账单数据,
            /*
             day2bills[{
                createTime: '',
                bills: []
             }]
             */
            const day2bills = []
            data.lists.forEach((bill) => {
                // 支出 , type_id === 1 为支出， type_id === 2 为收入
                if (bill.type_id === 1) {
                    state.monthExpense = state.monthExpense + (bill.amount / 100)
                } else {
                    state.monthIncome = state.monthIncome + bill.amount / 100
                }
                const date = new Date(bill.accounting_date *1000)
                bill.accounting_date = moment(date).format("YYYY年MM月DD日")
                bill.date = moment(date).format("YYYY年MM月DD日 hh:mm")
                // bill.month = date.getMonth() + 1
                // bill.day = date.getDate()
                bill.time = moment(date).format("hh:mm")
                bill.week = date.getDay()
                bill.amount = bill.type_id === 1 ?  '-' + bill.amount / 100 :  bill.amount / 100  // 格式不传小数
                if (day2bills.length > 0) {
                    const index = day2bills.findIndex((item) => item.createTime === bill.accounting_date)
                    if (index >= 0) {
                        day2bills[index].bills.push(bill)
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
            // getters.filtersBill
            console.log('输出或者', state.bills)
        }
    },

    getters: {
        // 根据filter的参数去查询
        // filtersBill(state, filters) {
        //     console.log('输出', state.cBill, filters)
        // }
        // 把所有的分类下的bill统计出来

    },

    mutations: {
        activeBill(state, bill) {
            state.billInfo = bill
        },

        getBillsByCategory (state, categories) {
            // const bills = state.allBills
            // bills.map((bill) => {
            //     bill.category_id =
            // })
            const categoryId2bills = []
            const pieData = []
            categories.forEach((category) => {
                const bills = state.allBills.filter((item) => item.category_id === category.id)
                let allMoney = 0
                bills.forEach((item) => {
                    allMoney = allMoney + item.amount * 1
                })
                if (bills && bills.length > 0) {
                    categoryId2bills.push({
                        category: category,
                        bills: bills,
                        allMoney: allMoney
                    })
                    pieData.push({
                        value: Math.abs(allMoney),
                        name: category.name
                    })
                }
            })

            categoryId2bills.sort((a, b) => {
                return Math.abs(b.allMoney) - Math.abs(a.allMoney)
            })

            state.categoryId2bills = categoryId2bills
            state.pieData = pieData
            console.log('测试个', state, categoryId2bills)
        }
    }
}

export default bill;
