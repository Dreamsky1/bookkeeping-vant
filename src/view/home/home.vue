<template>
  <div class="page-home-container ">
    首页
    <bottom-tabbar/>
  </div>
</template>
<script>
import BottomTabbar from '../../components/BottomTabbar/BottomTabbar'
export default {
  components: {
    BottomTabbar
  },

  data () {
    return {

    }
  },

  methods: {}
}
</script>
<style lang="scss">
.page-home-container {
  width: 100%;
  height: 100%;
  background-color: red;
  font-size: 20px;
}
</style>
