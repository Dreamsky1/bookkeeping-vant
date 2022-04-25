<template>
  <van-action-sheet v-model="visible" title="账单">
    <div class="content">
      <div class="head-buttons">
        <div v-for="(item, index) in categories" :key="index" @click="handleSelectType(item)">
          <div v-if="item.name === '收入'"
               :class="['expenses',
               activeCategory.id === item.id ? 'active-expenses' : ''
               ]">{{ item.name }}</div>
          <div v-else :class="['income', activeCategory.id === item.id ? 'active-income' : '']">{{ item.name }}</div>
        </div>

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
        <div v-for="(secondCategory, index) in activeCategory.secondCategories" :key="index"
             :class="['category', activeCategoryId === secondCategory.id ? 'selected' : '']"
             @click="handleSelectCategory(secondCategory.id)"
        >
          {{ secondCategory.name }}
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

    </div>
    <van-calendar v-model="showCalendar" :show-confirm="false" @confirm="handleConfirm" />
  </van-action-sheet>
</template>
<script>
import {ActionSheet, Button, Calendar, Field, Notify, NumberKeyboard} from 'vant';
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
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
      keyboard: true,
      activeCategoryId: 0
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
    show() {
      this.visible = true
    },

    close () {
      this.text = ''
      this.visible = false
    },

    ...mapMutations('category', ['updateActiveParentCategory']),
    ...mapActions('bill', ['createBill']),

    cancel () {
      document.activeElement.blur()
    },

    handleSelectType (item) {
      this.updateActiveParentCategory(item)
    },

    handleSelectCategory (id) {
      this.activeCategoryId = id
    },

    onInput (key) {
      this.text = this.text + key
    },

    onDelete () {
      this.text = this.text.substr(0, this.text.length - 1)
    },

    async handleSubmit () {
      if (!this.text) {
        Notify({ type: 'danger', message: '请输入金额' });
        return
      }
      const data = {
        type_id: this.activeCategory.id,
        category_id: this.activeCategoryId,
        amount: this.text * 100,
        remark: '默认的'
      }
      try {
        await this.createBill(data)
        this.close()
        Notify({ type: 'success', message: '创建成功' });
      } catch (e) {
        Notify({ type: 'danger', message: '创建失败' });
      }
      console.log('这个还是尽快回国', data)
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
    //background-color: #A2E1D4;
    // 超过可以滚动
    @include flex(row, between);
    flex-wrap: wrap;
    overflow-y: scroll;
    .category{
      width: 70px;
      height: 40px;
      font-size: 16px;
      background-color: darkgray;
      text-align: center;
      line-height: 40px;
      &.selected{
        background-color: #3EB674;
      }
    }
  }
}
</style>
