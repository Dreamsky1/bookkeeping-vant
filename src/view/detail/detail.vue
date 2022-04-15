<template>
  <div class="page page-home-container ">
    首页
    <div class="add-bill-button">
      <van-button round type="primary" icon="records" @click="handleAddBill">计一笔</van-button>
    </div>

    <add-bill-modal ref="addBillModal"></add-bill-modal>
    <bottom-tabbar/>
  </div>
</template>
<script>
import BottomTabbar from '../../components/BottomTabbar/BottomTabbar'
import { AddBillModal } from './components/index'
import { Button } from 'vant';
export default {
  components: {
    BottomTabbar,
    [Button.name]: Button,
    AddBillModal
  },

  data () {
    return {

    }
  },

  methods: {
    handleAddBill () {
      this.$refs.addBillModal.show()
    }
  }
}
</script>
<style lang="scss" scoped>
.page-home-container {
  width: 100%;
  height: 100%;
  .add-bill-button{
    position: absolute;
    bottom: 75px;
    right: 25px;
  }
}
</style>
