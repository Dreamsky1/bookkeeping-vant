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
                round
                width="3rem"
                height="3rem"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="category-time">
              <div class="name">{{ item.category.name }}</div>
              <div class="time">{{ item.time }}</div>
            </div>
          </div>
        </template>
        <template #right-icon>
          <span class="custom-right-price">
            <span v-if="item.type_id === 2">-</span>
            <span v-else>+</span>
            {{ item.amount }}</span>
        </template>
      </van-cell>

    </van-cell-group>
  </div>
</template>
<script>
import { CellGroup, Cell, Tag , Image, Button } from 'vant';
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
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
        if (item.type_id === 2) {
          allMoney = allMoney + item.amount
        }
      })

      return allMoney.toFixed(2)
    },

    income () {
      let allMoney = 0
      this.bill.bills.forEach((item) => {
        if (item.type_id === 3) {
          allMoney = allMoney + item.amount
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
        path: '/bill',
      })
      // 这里只要传一个id过去之后，从vuex中去找就行getters中
    }
  }
}
</script>
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
