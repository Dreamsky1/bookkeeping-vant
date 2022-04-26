<template>
  <van-action-sheet class="component-bottom-tab" v-model="showMonthPicker" title="请选择月份">
    <div class="content">
      <div class="year">{{ lastYear }}年</div>
      <div class="month-content">
        <div v-for="(month, index) in lastMonths" :key="index" class="month-i">
          <div :class="['month', month.id === activeMonthId ? 'select' : '']" v-if="month.id" @click="handleClickMonth(month)">{{ month.month }}</div>
        </div>
      </div>

      <div class="year now">{{ year }}年</div>
      <div class="month-content">
        <div v-for="(month, index) in months" :key="index" class="month-i">
          <div :class="['month', month.id === activeMonthId ? 'select' : '']" v-if="month.id" @click="handleClickMonth(month)">{{ month.month }}</div>
        </div>
      </div>
    </div>
  </van-action-sheet>
</template>
<script>
import {ActionSheet, Button} from 'vant';
import util from '@/lib/util'
export default {
  name: 'MonthPicker',
  components: {
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet
  },

  data () {
    return {
      showMonthPicker: false,
      activeMonthId: 0
    }
  },

  computed: {
    year () {
      return new Date().getFullYear()
    },

    lastYear () {
      return this.year - 1
    },

    months () {
      const months = []
      for (let i = 1; i <= new Date().getMonth() + 1; i++) {
        months.push({
          id: i+ '' + this.year,
          year: this.year,
          month: i + '月',
        })
      }
      return util.flexDatas(months, 4)
    },

    lastMonths () {
      const lastMonths = []
      for (let i = new Date().getMonth() + 1; i <= 12; i++) {
        lastMonths.push({
          id: i + '' + this.lastYear,
          year: this.lastYear,
          month: i + '月',
        })
      }
      return  util.flexDatas(lastMonths, 4)
    }

  },

  methods: {
    show() {
      this.showMonthPicker = true
    },

    handleClickMonth (month) {
      this.activeMonthId = month.id
      this.showMonthPicker = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/scss/mixins';
.component-bottom-tab {
  .content{
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 20px;
  }
  .year {
    margin-top: 20px;
    text-align: center;
  }
  .month-content{
    margin-top: 15px;
    @include flex(row, between);
    flex-wrap: wrap;
    .month-i {
      width: 78px;
      .month{
        margin-bottom: 8px;
        height: 40px;
        font-size: 20px;
        text-align: center;
        line-height: 40px;
        background-color: whitesmoke;
        &.select {
          background-color: #42b983;
        }
      }
    }
  }
}
</style>
