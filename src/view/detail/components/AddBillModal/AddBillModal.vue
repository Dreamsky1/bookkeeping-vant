<template>
  <van-action-sheet v-model="visible" title="账单">
    <div class="content">
      <div class="head-buttons">
        <div class="expenses">支出</div>
        <div class="income">收入</div>
        <div class="time">
          <van-button type="default" size="mini" @click="showCalendar = true">{{ date }}</van-button>
        </div>
      </div>
    </div>
    <van-calendar v-model="showCalendar" @confirm="handleConfirm" />
  </van-action-sheet>
</template>
<script>
import { ActionSheet, Button, Calendar } from 'vant';
export default {
  name: 'AddBillModal',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button,
    [Calendar.name]: Calendar
  },

  data () {
    return {
      visible: false,
      showCalendar: false,
      date: '2022/4/15'
    }
  },

  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },

    show() {
      this.visible = true
    },

    handleSelectTime () {

    },

    handleConfirm (date) {
      this.showCalendar = false
      this.date = this.formatDate(date);
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/scss/mixins';
.content{
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 200px;
  .head-buttons{
    @include flex(row, left);
    .expenses{
      width: 50px;
      height: 20px;
      color: green;
      background-color: #42b983;
      text-align: center;
    }
    .income{
      @extend .expenses;
      color: orange;
      background-color: chocolate;
    }
    .time{
      margin-left: auto;
    }
  }
}
</style>
