<template>
  <div class="page page-account-container ">
    <div class="account-head">
      <van-button type="primary" size="small" @click="handleSelectMonth">{{ year + '年' + month + '日' }}<van-icon name="apps-o" /></van-button>
      <div class="expense-title">共支出</div>
      <div class="expense-price">￥{{ monthExpense }}</div>
      <div class="income"><span>共收入</span><span>￥{{ monthIncome }}</span></div>
    </div>
    <template v-if="allBills.length > 0">
      <!--饼图，分类消费-->
      <month-pie-chart></month-pie-chart>
      <!--近七日的消费-->
<!--      <daily-comparison></daily-comparison>-->
      <!--当月消费榜单-->
      <month-ranking></month-ranking>
      <!--当月资产状态-->
      <month-picker ref="monthPicker"></month-picker>
    </template>
    <template v-else>
      <van-empty class="empty" description="暂无数据" />
    </template>
    <!--底部导航栏-->
    <bottom-tabbar/>
  </div>
</template>
<script>
import BottomTabbar from '@/components/BottomTabbar/BottomTabbar'
import MonthPicker from "@/components/MonthPicker";
import { MonthRanking, MonthPieChart } from './components'
import { Button, Icon, CellGroup, Empty } from 'vant';
import { mapState } from 'vuex'
export default {
  name: 'Account',
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Empty.name]: Empty,
    BottomTabbar,
    MonthPicker,
    MonthRanking,
    MonthPieChart,
  },

  data () {
    return {
      year: new Date().getFullYear()
    }
  },

  computed: {
    ...mapState({
      monthExpense: state => state.bill.monthExpense,
      monthIncome: state => state.bill.monthIncome,
      month: state => state.bill.month,
      allBills: state => state.bill.allBills
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
  padding-bottom: 100px;
  background-color: #FFFFFF !important;
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
