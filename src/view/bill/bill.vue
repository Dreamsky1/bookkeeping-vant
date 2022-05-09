<template>
  <div class="page page-bill-content">
    <van-nav-bar
        title="账单详情"
        left-text="返回"
        fixed
        left-arrow
        @click-left="$router.back()"
    />
    <div class="head-buttons">
      <van-tabs type="card" @click="handleSelectType" color="#3EB674">
        <van-tab :title="item.name" :name="index" v-for="(item, index) in categories" :key="index"></van-tab>
      </van-tabs>
    </div>
    <!--金额-->
    <div class="input-amount">
      <van-field v-model="amount" label="金额" left-icon="warning-o" placeholder="0.00" clickable @focus="cancel" input-align="right"/>
    </div>
    <!-- 分类 -->
    <div class="select-category van-hairline--top van-hairline--bottom">
      <div v-for="(secondCategory, index) in activeCategory.secondCategories" :key="index"
           class="category"
           @click="handleSelectCategory(secondCategory.id)"
      >
        <img :class="['image-category', activeCategoryId === secondCategory.id ? 'selected' : '']" :src="`/${secondCategory.image}.png`"/>
        <div style="font-size: 12px">{{ secondCategory.name }}</div>
      </div>
    </div>
    <!-- 备注 -->
    <van-field
        v-model="message"
        autosize
        label="备注"
        maxlength="50"
        placeholder="请输入备注"
        class="input-remark"
        input-align="right"
    />
    <!--日期-->
    <van-cell title="选择日期" :value="date" is-link @click="showCalendar = true" />
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
    <!--选择日期-->
    <van-popup v-model="showCalendar" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择日期"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showCalendar = false"
        @confirm="handleConfirm"
    /></van-popup>

  </div>
</template>
<script>
import {ActionSheet, Button, Calendar, Field, Notify, NumberKeyboard, Tabs, Tab, Popup, NavBar, DatetimePicker, Cell} from 'vant';
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import moment from "moment";
export default {
  name: 'Bill',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button,
    [Calendar.name]: Calendar,
    [Field.name]: Field,
    [NumberKeyboard.name]: NumberKeyboard,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
    [DatetimePicker.name]: DatetimePicker,
    [Cell.name]: Cell
  },

  data () {
    return {
      visible: false,
      showCalendar: false,
      date: this.localDate(),
      sDate: new Date(),
      amount: '',
      keyboard: true,
      activeCategoryId: 0,
      message: '',
      minDate: new Date(2021, 5, 1),
      maxDate: new Date(2022, 12, 1),
      currentDate: new Date(),
      bill: null
    }
  },

  computed: {
    ...mapState({
      categories: state => state.category.categories,
      activeCategory: state => state.category.activeParentCategory
    }),
    ...mapGetters('category', ['filtersCategory'])
  },

  mounted () {
    const id = this.$route.query.id
    this.init(id)
  },

  methods: {
    ...mapMutations('category', ['updateActiveParentCategory']),
    ...mapActions('bill', ['createBill', 'filtersBill', 'updateBill']),

    async init (id) {
      if (id) {
        const bill = await this.filtersBill(id)
        this.bill = bill
        console.log('输出这id', id ,bill)
        this.activeCategoryId = bill.category.id
        this.amount = Math.abs(bill.amount * 1)
        this.message = bill.remark
        this.date = bill.accounting_date
      }
    },

    cancel () {
      document.activeElement.blur()
    },

    handleSelectType (index) {
      this.updateActiveParentCategory(index)
    },

    handleSelectCategory (id) {
      this.activeCategoryId = id
    },

    onInput (key) {
      this.amount = this.amount + key
    },

    onDelete () {
      this.amount = this.amount.substr(0, this.amount.length - 1)
    },

    async handleSubmit () {
      if (!this.amount) {
        Notify({ type: 'danger', message: '请输入金额' });
        return
      }
      if (this.activeCategoryId === 0) {
        Notify({ type: 'danger', message: '请选择分类' });
        return
      }
      const data = {
        category_id: this.activeCategoryId,
        accounting_date: moment(this.sDate).format("YYYY-MM-DD hh:mm:ss"),
        amount: this.amount * 100,
        remark: this.message,
        type_id: this.activeCategory.id,
        user_id: localStorage.getItem('user_id')
      }
      try {
        if (!this.bill) {
          await this.createBill(data)
        } else {
          data['id'] = this.bill.id
          await this.updateBill(data)
        }

        this.$router.back()
        Notify({ type: 'success', message: '创建成功' });
      } catch (e) {
        Notify({ type: 'danger', message: '创建失败' });
      }
      console.log('emmmm....', data)
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

    handleConfirm (date) {
      this.showCalendar = false
      this.sDate = date
      this.date = this.formatDate(date);
    }
  }
}
</script>
<style lang="scss">
@import 'src/scss/mixins';
.page-bill-content{
  background-color: #FFFFFF !important;
  .van-tabs .van-tabs__wrap .van-tabs__nav{
    width: 250px;
    margin: 0 auto;
  }
  .key-code .van-number-keyboard{
    padding: 0;
  }
  .head-buttons{
    margin-top: 70px;
    .time{
      margin-left: auto;
    }
  }
  .input-amount{
    margin-top: 30px;
    width: 100%;
    //border-bottom: 1px solid;
    .van-cell--large{
      padding-left: 0;
      font-size: 25px;
      .van-cell__title{
        font-size: 25px;
      }
    }
  }
  .select-category{
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #FFFFFF;
    height: 150px;
    @include flex(row, between);
    align-items: flex-start;
    flex-wrap: wrap;
    overflow-y: scroll;
    .category{
      //width: 70px;
      //height: 40px;
      font-size: 16px;
      //background-color: darkgray;
      text-align: center;
      //line-height: 40px;
      .image-category{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        &.selected{
          background-color: #3EB674;
        }
      }
    }
  }
}
</style>
