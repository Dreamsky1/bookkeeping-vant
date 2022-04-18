<template>
  <div class="page page-home-container ">
    <div class="detail-head">
      <van-button type="primary" size="mini" @click="handleSelectCategory">{{ category }} | <van-icon name="apps-o" /></van-button>
      <div class="date-info">
        <van-button type="primary" size="mini" @click="handleSelectMonth">2022年4月<van-icon name="arrow-down" /></van-button>
        <div class="all-detail">总支出￥22 总入账￥223</div>
      </div>
    </div>
    <div class="day-bill-list" v-if="bills.length > 0">
      <day-bill-card v-for="(bill, index) in bills" :key="index" :bill="bill"></day-bill-card>
    </div>
    <van-empty description="暂无数据" v-else/>

    <div class="add-bill-button">
      <van-button round type="primary" icon="records" @click="handleAddBill">计一笔</van-button>
    </div>

    <month-picker ref="monthPicker"></month-picker>
    <category-picker ref="categoryPicker"></category-picker>
    <add-bill-modal ref="addBillModal"></add-bill-modal>
    <bottom-tabbar/>
  </div>
</template>
<script>
import BottomTabbar from '../../components/BottomTabbar/BottomTabbar'
import MonthPicker from "@/components/MonthPicker";
import CategoryPicker from "@/components/CategoryPicker";
import { AddBillModal, DayBillCard } from './components/index'
import { Button, CellGroup, Icon, Empty, List } from 'vant';
export default {
  components: {
    BottomTabbar,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Empty.name]: Empty,
    [List.name]: List,
    AddBillModal,
    DayBillCard,
    MonthPicker,
    CategoryPicker
  },

  data () {
    return {
      category: '全部分类',
      bills: [{
        title: '标题'
      }, {
        title: '广东省'
      }, {
        title: 'gds '
      }]
    }
  },

  methods: {
    handleAddBill () {
      this.$refs.addBillModal.show()
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
}
</style>
