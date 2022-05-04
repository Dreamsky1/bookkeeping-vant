<template>
  <van-cell-group class="month-structure-component">
    <van-cell>
      <template #title>
        <span class="custom-title">支出排行</span>
      </template>
      <template #right-icon>
        <div class="tabs">
          <div :class="['tab', tab.name === activeTab ? 'selected' : '']" @click="handleSelectTab(tab)" v-for="(tab, index) in tabs" :key="index">
            {{ tab.name }}
          </div>
        </div>
      </template>
    </van-cell>

    <template v-if="categoryId2bills.length > 0">
      <van-cell v-for="(item, index) in categoryId2bills" :key="index">
        <template #title>
          <div class="bill-category">
            <span>{{ index + 1 }}</span>
            <van-image
                round
                width="2rem"
                height="2rem"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="category-time">{{ item.category.name }}</div>
          </div>
          <!--        <van-progress :percentage="50" stroke-width="8" />-->
        </template>
        <template #right-icon>
          <span class="custom-right-price">{{ item.allMoney }}</span>
        </template>
      </van-cell>
    </template>
  </van-cell-group>
</template>
<script>
import { Button, Icon, CellGroup, Cell, Image, Progress } from 'vant';
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'MonthStructure',
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Progress.name]: Progress
  },

  data () {
    return {
      tabs: [{
        name: '支出'
      }, {
        name: '收入'
      }],
      activeTab: '支出'
    }
  },

  computed: {
    ...mapState({
      activeParentCategory: state => state.category.activeParentCategory,
      categoryId2bills: state => state.bill.categoryId2bills
    }),
    ...mapGetters('bill', ['sortBills'])
  },

  mounted () {
    this.initData()
  },

  methods: {
    ...mapMutations('bill', ['getBillsByCategory']),
    handleSelectTab (tab) {
      this.activeTab = tab.name
      this.getBillsByCategory(this.activeParentCategory.secondCategories)
    },

    initData() {
      this.getBillsByCategory(this.activeParentCategory.secondCategories)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/scss/mixins';
.month-structure-component{
  //padding: 10px;
  .tabs{
    @include flex(row);
    .tab{
      font-size: 15px;
      width: 50px;
      height: 25px;
      background-color: #EDEDED;
      margin-right: 5px;
      text-align: center;
      line-height: 25px;
      &.selected{
        background-color: #42b983;
      }
    }
  }
  .bill-category{
    @include flex(row,left);
  }
}
</style>
