<template>
  <div class="page-day-bill">
    <van-cell-group inset>
      <van-cell class="title">
        <template #title>
          <span class="custom-title">{{ bill.createTime }}</span>
        </template>
        <template #right-icon>
          <van-tag type="success" size="mini">出</van-tag>
          <span style="margin-right: 10px;">{{ expense }}</span>
          <van-tag type="warning" size="mini">入</van-tag>
          {{ income }}
        </template>
      </van-cell>
      <van-cell v-for="(item, index) in bill.bills" :key="index" @click="handleClickBill(item)">
        <template #title>
          <div class="bill-category">
            <van-image
                width="3rem"
                height="3rem"
                :src="`/${item.category.image}.png`"
            />
            <div class="category-time">
              <div class="name">{{ item.category.name }}</div>
              <div class="time">{{ item.time }}</div>
            </div>
          </div>
        </template>
        <template #right-icon>
          <span class="custom-right-price">{{ item.amount }}</span>
        </template>
      </van-cell>

    </van-cell-group>
  </div>
</template>
<script>
import { CellGroup, Cell, Tag , Image, Button } from 'vant';
import { mapMutations } from 'vuex'
export default {
  name: 'DayBillCard',
  components: {
    [CellGroup.name]: CellGroup,
    [Tag .name]: Tag ,
    [Image.name]: Image,
    [Button.name]: Button,
    [Cell.name]: Cell
  },

  props: {
    bill: {
      type: Object
    }
  },

  data () {
    return {
    }
  },

  computed: {
    expense () {
      let allMoney = 0
      this.bill.bills.forEach((item) => {
        if (item.type_id === 1) {
          allMoney = allMoney + item.amount * 1
        }
      })

      return allMoney.toFixed(2)
    },

    income () {
      let allMoney = 0
      this.bill.bills.forEach((item) => {
        if (item.type_id === 2) {
          allMoney = allMoney + item.amount * 1
        }
      })

      return allMoney.toFixed(2)
    }
  },

  methods: {
    ...mapMutations('bill', ['activeBill']),
    formatDate () {
      const date = new Date(this.bill.created_on * 1000)
      return date.getMonth() + 1 + '月' + date.getDate() + '日'
    },

    handleClickBill (item) {
      this.activeBill(item)
      this.$router.push({
        path: '/bill_detail',
      })
    }
  }
}
</script>
<style lang="scss">
.bill-category{
  .van-image{
    .van-image__img{
      border-radius: 50%;
      background-color: #9ADBB8;
    }
  }
}
</style>
<style lang="scss" scoped>
@import 'src/scss/mixins';
.page-day-bill{
  margin-top: 5px;
  .van-cell-group--inset{
    margin: 0;
  }
  .title{
    //background-color: grey;
    .custom-title{
      font-weight: bold;
    }
  }
  .bill-category{
    @include flex(row,left);
    .category-time{
      margin-left: 10px;
      .name{
        font-size: 15px;
        font-weight: bold;
      }
      .time{
        font-size: 12px;
      }
    }
  }
  .custom-right-price{
    font-weight: bold;
  }
}
</style>
