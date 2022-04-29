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
      <van-field v-model="text" label="金额" left-icon="warning-o" placeholder="0.00" clickable @focus="cancel" input-align="right"/>
    </div>
    <!-- 分类 -->
    <div class="select-category">
      <div v-for="(secondCategory, index) in activeCategory.secondCategories" :key="index"
           class="category"
           @click="handleSelectCategory(secondCategory.id)"
      >
<!--        <van-image-->
<!--            round-->
<!--            width="3rem"-->
<!--            height="3rem"-->
<!--            src="https://img01.yzcdn.cn/vant/cat.jpeg"-->
<!--        />-->
        <img :class="['image-category', activeCategoryId === secondCategory.id ? 'selected' : '']" src="../../static/images/food.png"/>
        <div style="font-size: 12px">{{ secondCategory.name }}</div>
      </div>
    </div>
    <div class="bottom-remark">
      <van-field
          v-model="message"
          autosize
          label="备注"
          maxlength="50"
          placeholder="请输入备注"
          class="input-remark"
          input-align="right"
      />
      <div class="time">
        <van-button type="default" size="small" @click="showCalendar = true">{{ date }}</van-button>
      </div>
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

    <van-calendar v-model="showCalendar" :show-confirm="false" @confirm="handleConfirm" />
  </div>
</template>
<script>
import {ActionSheet, Button, Calendar, Field, Notify, NumberKeyboard, Tabs, Tab, Image, NavBar} from 'vant';
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import moment from "moment";
export default {
  name: 'AddBillModal',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button,
    [Calendar.name]: Calendar,
    [Field.name]: Field,
    [NumberKeyboard.name]: NumberKeyboard,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Image.name]: Image,
    [NavBar.name]: NavBar
  },

  data () {
    return {
      visible: false,
      showCalendar: false,
      date: this.localDate(),
      sDate: new Date(),
      text: '',
      keyboard: true,
      activeCategoryId: 0,
      message: ''
    }
  },

  computed: {
    ...mapState({
      categories: state => state.category.categories,
      activeCategory: state => state.category.activeParentCategory
    }),
    ...mapGetters('category', ['filtersCategory'])
  },

  methods: {
    ...mapMutations('category', ['updateActiveParentCategory']),
    ...mapActions('bill', ['createBill']),

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
      this.text = this.text + key
    },

    onDelete () {
      this.text = this.text.substr(0, this.text.length - 1)
      console.log('手粗这', this.activeCategory)
    },

    async handleSubmit () {
      if (!this.text) {
        Notify({ type: 'danger', message: '请输入金额' });
        return
      }
      if (this.activeCategoryId === 0) {
        Notify({ type: 'danger', message: '请选择分类' });
        return
      }
      const data = {
        type_id: this.activeCategory.id,
        category_id: this.activeCategoryId,
        accounting_date: moment(this.sDate).format("YYYY-MM-DD hh:mm:ss"),
        amount: this.text * 100,
        remark: this.message
      }
      try {
        await this.createBill(data)
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
      console.log('输出这个date', moment(date).format())
      console.log('输出这个new Date', new Date())
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
  padding-top: 50px;
  .van-tabs .van-tabs__wrap .van-tabs__nav{
    width: 250px;
    margin: 0 auto;
  }
  .head-buttons{
    padding-top: 20px;
    .time{
      margin-left: auto;
    }
  }
  .input-amount{
    margin-left: 20px;
    margin-top: 30px;
    width: 90%;
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
    margin-left: 20px;
    margin-top: 20px;
    //background-color: #42b983;
    width: 90%;
    height: 150px;
    //background-color: #A2E1D4;
    // 超过可以滚动
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
          //border: 1px solid #42b983;
        }
      }
    }
  }

  .bottom-remark{
    @include flex(row, between);
    .input-remark{
      margin-left: 20px;
      width: 75%;
      height: auto;
      margin-top: 10px;
    }
    .time{
      height: 44px;
      margin-right: 10px;
    }
  }
}
</style>
