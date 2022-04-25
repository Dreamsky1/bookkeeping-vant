<template>
  <van-action-sheet class="component-bottom-tab" v-model="showCategoryPicker" title="请选择月份">
    <div class="content">
      <div :class="['all-category', activeCategoryId === 0 ? 'selected' : '']"
           @click="handleSelectCategory(0)">全部分类</div>
      <div class="type-categories" v-for="(category, index) in categories" :key="index">
        <div class="expense">{{ category.name }}</div>
        <div class="expense-categories">
          <div v-for="secondCategory in flexCategories(category.secondCategories)"
               :key="secondCategory.id"
               @click="handleSelectCategory(secondCategory.id)"
               :class="['expense-category', activeCategoryId === secondCategory.id ? 'selected' : '']"
          >
            <div class="category">{{ secondCategory.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </van-action-sheet>
</template>
<script>
import { ActionSheet, Button } from 'vant';
// import util from '@/lib/util'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Login',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button
  },

  data () {
    return {
      showCategoryPicker: false,
    }
  },

  computed: {
    ...mapState({
      categories: state => state.category.categories,
      activeCategoryId: state => state.category.activeCategoryId
    }),
    // ...mapGetters('category', ['flexCategories'])
  },

  methods: {
    ...mapMutations('category', ['updateActiveCategoryId']),

    show() {
      this.showCategoryPicker = true
    },

    handleSelectCategory (id) {
      this.updateActiveCategoryId(id)
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
    &.selected{
      background-color: #42b983;
    }
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
