<template>
  <van-action-sheet class="component-bottom-tab" v-model="showCategoryPicker" title="请选择月份">
    <div class="content">
      <div class="all-category">全部分类</div>
      <div class="type-categories" v-for="i in 2" :key="i">
        <div class="expense">支出</div>
        <div class="expense-categories">
          <div v-for="(category, index) in flexCategories(categories)" :key="index" class="expense-category">
            <div class="category">{{ category.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </van-action-sheet>
</template>
<script>
import { ActionSheet, Button } from 'vant';
// import util from '@/lib/util'
export default {
  name: 'Login',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button
  },

  data () {
    return {
      showCategoryPicker: false,
      categories: [
        {
          name: '交通'
        },
        {
          name: '餐饮'
        },
        {
          name: '教育'
        },
        {
          name: '服饰'
        },
      ]
    }
  },

  methods: {
    show() {
      this.showCategoryPicker = true
    },

    flexCategories (datas) {
      return datas
      // return util.flexDatas(datas, 3)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/scss/mixins';
.component-category-picker{
}
.content {
  padding: 20px 15px 20px 15px;
  .all-category{
    width: 110px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: whitesmoke;
  }
  .type-categories{
    .expense{
      margin-top: 12px;
      margin-bottom: 12px;
    }
    .expense-categories{
      @include flex(row, between);
      flex-wrap: wrap;
      .expense-category{
        @extend .all-category;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
