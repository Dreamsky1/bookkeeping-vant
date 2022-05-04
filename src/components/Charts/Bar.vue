<template>
  <div id="barChart"></div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  name: 'Bar',
  components: {},

  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
    }
  },

  mounted () {
    this.drawPieChart()
  },


  methods: {
    drawPieChart() {
      this.option.series.data = this.pieData
      let myChart = echarts.init(document.getElementById('barChart'))
      myChart.resize({
        height: 300,
        width: 300
      }) // 设置大小
      myChart.setOption(this.option)
    }
  }
}
</script>