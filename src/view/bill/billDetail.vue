<template>
  <div class="page page-bill">
    <van-nav-bar
        title="账单详情"
        left-text="返回"
        fixed
        left-arrow
        @click-left="$router.back()"
    />
    <van-cell-group inset class="bill-detail">
      <div class="bill-category">
        <van-image
            round
            width="2rem"
            height="2rem"
            :src="`/${billInfo.category.image}.png`"
        />
        <div class="category-title">{{ billInfo.category.name }}<van-icon name="arrow" /></div>
      </div>
      <div class="bill-price">{{ billInfo.amount }}</div>
      <div class="bill-time">记录时间：<span>{{ billInfo.date }}</span></div>
      <div class="bill-from">备注：{{ billInfo.remark }}</div>
      <div class="bill-actions">
        <van-button type="default" icon="delete-o" plain size="large" @click="handleDelete">删除</van-button>
        <van-button type="default" icon="edit" size="large" @click="handleEditBill">编辑</van-button>
      </div>
    </van-cell-group>
  </div>
</template>
<script>
import {Cell, CellGroup, Image, Button, Icon, NavBar, Toast} from 'vant';
import { mapState } from 'vuex'
export default {
  name: 'BillDetail',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [NavBar.name]: NavBar
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapState({
      billInfo: state => state.bill.billInfo
    })
  },

  mounted () {
  },

  methods: {
    handleEditBill () {
      this.$router.push({
        path: '/bill',
        query: {
          id: this.billInfo.id
        }
      })
    },

    async handleDelete () {
      await this.$store.dispatch('bill/deleteBill', this.billInfo.id).then(() => {
        Toast.success('删除成功')
        this.$router.back()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/scss/mixins';
.bill-detail{
  margin-top: 50px;
}
.bill-category{
  padding-top: 25px;
  padding-bottom: 25px;
  width: 100%;
  @include flex(row, center);
  .category-title{
    //margin-top: -10px;
  }
}
.bill-price{
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  padding-bottom: 20px;
}
.bill-time{
  padding-left: 20px;
  font-size: 15px;
}
.bill-from {
  @extend .bill-time;
}
.bill-actions{
  margin-top: 20px;
  @include flex(row,left);
  .van-button--default{
    border: transparent;
  }
}
</style>
