export default {
    flexDatas (datas, flex) {
        const remainder = datas.length % flex
        for (let i = 0; i< flex - remainder; i++) {
            datas.push({})
        }
        return datas
    },

    currentMonthRange (month) {
        // 现在要查询的是一个月的
        const currentYear = new Date().getFullYear()
        const nextMonth = month * 1 + 1
        // 2022-5-1 00:00:00
        const startTime = currentYear + '-0' + month + '-' + '01' + ' 00:00:00'
        const endTime = currentYear + '-0' + nextMonth + '-' + '01' + ' 00:00:00'
        return {
            startTime,
            endTime
        }
    },

    parseData() {

    }
}
