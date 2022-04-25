<template>
  <div class="page-day-bill">
    <van-cell-group inset>
      <van-cell class="title">
        <template #title>
          <span class="custom-title">{{ formatDate() }}</span>
        </template>
        <template #right-icon>
          <van-tag type="success" size="mini">出</van-tag>
          <span style="margin-right: 10px;">8.00</span>
          <van-tag type="warning" size="mini">入</van-tag>0.00
        </template>
      </van-cell>
      <van-cell v-for="i in 3" :key="i" @click="handleClickBill(i)">
        <template #title>
          <div class="bill-category">
            <van-image
                round
                width="3rem"
                height="3rem"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="category-time">
              <div class="name">交通</div>
              <div class="time">17:23</div>
            </div>
          </div>
        </template>
        <template #right-icon>
          <span class="custom-right-price">-22</span>
        </template>
      </van-cell>

    </van-cell-group>
  </div>
</template>
<script>
import { CellGroup, Cell, Tag , Image, Button } from 'vant';
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

  methods: {
    formatDate () {
      const date = new Date(this.bill.created_on * 1000)
      return date.getMonth() + 1 + '月' + date.getDate() + '日'
    },

    handleClickBill (id) {
      console.log('输出这个id', id)
      this.$router.push({
        path: '/bill',
        query: {
          id: id
        }
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
