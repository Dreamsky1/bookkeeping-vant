<template>
  <div class="page page-home-container ">
    <div class="detail-head">
      <van-button type="primary" size="mini" @click="handleSelectCategory">{{ category }} | <van-icon name="apps-o" /></van-button>
      <div class="date-info">
        <van-button type="primary" size="mini" @click="handleSelectMonth">{{ year + '年' + month + '日' }}<van-icon name="arrow-down" /></van-button>
        <div class="all-detail">总支出￥{{ monthExpense }} 总入账￥{{ monthIncome }}</div>
      </div>
    </div>
    <div class="day-bill-list" v-if="bills.length > 0">
      <day-bill-card v-for="(bill, index) in bills" :key="index" :bill="bill"></day-bill-card>
    </div>
    <van-empty class="empty" description="暂无数据" v-else/>

    <div class="add-bill-button">
      <van-button round type="primary" icon="records" @click="handleAddBill">计一笔</van-button>
    </div>

    <month-picker ref="monthPicker"></month-picker>
    <category-picker ref="categoryPicker"></category-picker>
    <bottom-tabbar/>
  </div>
</template>
<script>
import BottomTabbar from '../../components/BottomTabbar/BottomTabbar'
import MonthPicker from "@/components/MonthPicker";
import CategoryPicker from "@/components/CategoryPicker";
import { DayBillCard } from './components/index'
import { Button, CellGroup, Icon, Empty, List } from 'vant';
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    BottomTabbar,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Empty.name]: Empty,
    [List.name]: List,
    DayBillCard,
    MonthPicker,
    CategoryPicker
  },

  data () {
    return {
      category: '全部分类',
      year: new Date().getFullYear()
    }
  },

  computed: {
    ...mapState({
      bills: state => state.bill.bills,
      monthExpense: state => state.bill.monthExpense,
      monthIncome: state => state.bill.monthIncome,
      month: state => state.bill.month
    })
  },

  async mounted () {
    await this.init()
  },

  methods: {
    ...mapActions('category', ['getCategories']),
    ...mapActions('bill', ['getBills']),

    async init () {
      await this.getCategories()
      await this.getBills()
    },

    handleAddBill () {
      // this.$refs.addBillModal.show()
      this.$router.push({
        path: '/bill'
      })
    },

    handleSelectMonth () {
      this.$refs.monthPicker.show()
    },

    handleSelectCategory () {
      this.$refs.categoryPicker.show()
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/scss/mixins';
.page-home-container {
  width: 100%;
  height: 100%;
  .add-bill-button{
    position: fixed;
    bottom: 75px;
    right: 25px;
  }
  .detail-head{
    z-index: 10;
    padding-top: 20px;
    padding-left: 10px;
    padding-bottom: 20px;
    width: 100%;
    position: fixed;
    background-color: #42b983;
    .date-info{
      margin-top: 10px;
      @include flex(row, left);
      .all-detail{
        margin-left: 5px;
        font-size: 15px;
      }
    }
  }
  .day-bill-list{
    padding-top: 110px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .empty{
    margin-top: 125px;
  }
}
</style>
