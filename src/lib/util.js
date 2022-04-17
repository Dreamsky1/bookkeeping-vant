export default {
    flexDatas (datas, flex) {
        const remainder = datas.length % flex
        for (let i = 0; i< flex - remainder; i++) {
            datas.push({})
        }
        return datas
    }
}