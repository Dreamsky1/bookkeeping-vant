<template>
  <div class="component-bottom-tab">
    <van-tabbar route v-model="active">
      <van-tabbar-item replace to="/detail" icon="balance-list-o">明细</van-tabbar-item>
      <van-tabbar-item replace to="/account" icon="chart-trending-o">统计</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
  name: 'BottomTabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },

  data () {
    return {
      active: 0,
      icon: {
        active: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png',
      },
      pageRouters: ['/', '/account', '/user']
    }
  },

  methods: {
  }
}
</script>
<style lang="scss" scoped>
.component-bottom-tab {

}
</style>
