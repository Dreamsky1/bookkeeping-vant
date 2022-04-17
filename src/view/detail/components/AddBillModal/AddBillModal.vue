<template>
  <van-action-sheet v-model="visible" title="账单">
    <div class="content">
      <div class="head-buttons">
        <div :class="['expenses', activeType === 'expenses' ? 'active-expenses' : '']" @click="handleSelectType('expenses')">支出</div>
        <div :class="['income', activeType === 'income' ? 'active-income' : '']" @click="handleSelectType('income')">收入</div>
        <div class="time">
          <van-button type="default" size="small" @click="showCalendar = true">{{ date }}</van-button>
        </div>
      </div>
      <!--金额-->
      <div class="input-amount">
        <van-field v-model="text" label="￥" clickable size="large" label-width="12px" @focus="cancel"/>
      </div>
      <!-- 分类 -->
      <div class="select-category">

      </div>

      <div class="key-code">
        <van-number-keyboard
            :show="keyboard"
            theme="custom"
            extra-key="."
            close-button-text="完成"
            @blur="keyboard = true"
            @input="onInput"
            @delete="onDelete"
            @close="handleSubmit"
        />
      </div>

    </div>
    <van-calendar v-model="showCalendar" :show-confirm="false" @confirm="handleConfirm" />
  </van-action-sheet>
</template>
<script>
import { ActionSheet, Button, Calendar, Field, NumberKeyboard  } from 'vant';
export default {
  name: 'AddBillModal',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button,
    [Calendar.name]: Calendar,
    [Field.name]: Field,
    [NumberKeyboard.name]: NumberKeyboard
  },

  data () {
    return {
      visible: false,
      showCalendar: false,
      date: this.localDate(),
      activeType: 'expenses',
      text: '',
      keyboard: true
    }
  },

  methods: {
    cancel () {
      document.activeElement.blur()
    },
    handleSelectType (type) {
      this.activeType = type
    },

    onInput (key) {
      this.text = this.text + key
    },

    onDelete () {
      this.text = this.text.substr(0, this.text.length - 1)
    },

    handleSubmit () {
      console.log('这个还是尽快回国')
    },

    localDate () {
      const date = new Date()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return month + '月' + day +'日'
    },

    formatDate(date) {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
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
  padding-bottom: 270px;
  .head-buttons{
    @include flex(row, left);
    .expenses{
      width: 50px;
      height: 30px;
      color: darkgray;
      //color: #42b983;
      background-color: #f5f5f5;
      line-height: 30px;
      text-align: center;
      &.active-expenses {
        background-color: #A2E1D4;
        color: #42b983;
      }
    }
    .income{
      @extend .expenses;
      margin-left: 5px;
      //color: #FFB5B5;
      color: darkgray;
      background-color: #f5f5f5;
      &.active-income{
        background-color: #FFB5B5;
        color: #fff41d;
      }
    }
    .time{
      margin-left: auto;
    }
  }
  .input-amount{
    border-bottom: 1px solid;
    .van-cell--large{
      padding-left: 0;
      font-size: 25px;
      .van-cell__title{
        font-size: 25px;
      }
    }
  }
  .select-category{
    width: 100%;
    height: 100px;
    background-color: #A2E1D4;
  }
}
</style>
