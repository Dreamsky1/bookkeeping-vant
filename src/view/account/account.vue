<template>
  <div class="page page-account-container ">
    <div class="account-head">
      <van-button type="primary" size="small" @click="handleSelectMonth">2022年4月<van-icon name="apps-o" /></van-button>
      <div class="expense-title">共支出</div>
      <div class="expense-price">￥{{ monthExpense }}</div>
      <div class="income"><span>共收入</span><span>￥{{ monthIncome }}</span></div>
    </div>
    <!--饼图，分类消费-->
    <month-pie-chart></month-pie-chart>
    <!--当月消费榜单-->
    <month-structure></month-structure>
    <!--当月资产状态-->
    <month-picker ref="monthPicker"></month-picker>
    <bottom-tabbar/>
  </div>
</template>
<script>
import BottomTabbar from '@/components/BottomTabbar/BottomTabbar'
import MonthPicker from "@/components/MonthPicker";
import { MonthStructure, MonthPieChart } from './components'
import { Button, Icon, CellGroup } from 'vant';
import { mapState } from 'vuex'
export default {
  name: 'Account',
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    BottomTabbar,
    MonthPicker,
    MonthStructure,
    MonthPieChart
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapState({
      monthExpense: state => state.bill.monthExpense,
      monthIncome: state => state.bill.monthIncome
    })
  },

  mounted() {
  },

  methods: {
    handleSelectMonth () {
      this.$refs.monthPicker.show()
    },
  }
}
</script>
<style lang="scss" scoped>
@import 'src/scss/mixins';
.page-account-container{
  padding-bottom: 50px;
  .account-head{
    padding-top: 15px;
    margin-bottom: 10px;
    width: 100%;
    height: 125px;
    background-color: #3EB674;
    text-align: center;
    .expense-title{
      margin-top: 5px;
      color: #9ADBB8;
      font-size: 10px;
    }
    .expense-price{
      color: #FFFFFF;
      font-size: 25px;
      font-weight: bold;
    }
    .income{
      font-size: 15px;
      color: #DDB13B;
    }
  }
}
</style>
