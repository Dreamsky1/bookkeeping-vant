<template>
  <div id="pieChart"></div>
</template>
<script>
import * as echarts from 'echarts';
import { mapState } from 'vuex'
export default {
  name: 'PieChart',
  components: {},

  data () {
    return {
      // 标准参数
      defaultOption: {
        title: {
          text: '支出构成',
          left: 'center'
        },
        series: [
          {
            name: '支出结构',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1000, name: '娱乐 35%' },
              { value: 2555, name: '餐饮 50%' },
              { value: 234, name: '交通 5%' },
              { value: 400, name: '游戏 10%' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
    }
  },
  computed: {
    ...mapState({
      pieData: state => state.bill.pieData
    })
  },

  watch: {
    pieData() {
      // this.drawPieChart()
    }
  },

  mounted () {
    this.drawPieChart()
  },

  methods: {
    drawPieChart () {
      let myChart = echarts.init(document.getElementById('pieChart'))
      myChart.resize({
        height: 300,
        width: 300
      }) // 设置大小
      myChart.setOption({
        title: {
          text: '支出构成',
          left: 'center'
        },
        series: [
          {
            name: '支出结构',
            type: 'pie',
            radius: '50%',
            data: this.pieData,
            color: [
              '#37A2DA',
              '#32C5E9',
              '#67E0E3',
              '#9FE6B8',
              '#FFDB5C',
              '#ff9f7f',
              '#fb7293',
              '#E062AE',
              '#E690D1',
              '#e7bcf3',
              '#9d96f5',
              '#8378EA',
              '#96BFFF'
            ],// 定制化颜色
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#pieChart {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
}
</style>
