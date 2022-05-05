<template>
  <div class="page page-me-container ">
    <van-cell-group inset class="user-info-content">
      <div class="user-info">
        <van-image
            round
            width="4rem"
            height="4rem"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="info-detail">
          <div class="name">{{ userInfo.username }}</div>
          <div class="signature">个性签名：{{ userInfo.signature }}</div>
        </div>
        <div class="integral" v-if="false">{{ userInfo.integral }}分</div>
      </div>
    </van-cell-group>

    <van-cell-group inset class="more-info-content">
      <van-cell title="优惠服务" />
      <div class="more-info" v-if="false">敬请期待....</div>
    </van-cell-group>

    <van-cell-group inset>
      <van-cell icon="gold-coin-o" title="预算管理" is-link @click="handleClick('budget')"/>
      <van-cell icon="gold-coin-o" title="个人中心" is-link @click="handleClick('userInfo')"/>
      <van-cell icon="coupon-o" title="分类管理" is-link @click="handleClick('category')"/>
      <van-cell icon="comment-o" title="反馈与建议" is-link  @click="handleClick('suggest')"/>
      <van-cell icon="shop-o" title="关于账计" is-link value="V1.0.0" @click="handleClick('about')" />
    </van-cell-group>
    <!--使用动画库测试-->
    <div class="animate__animated animate__bounceInLeft" v-if="visible">这个是一个测试一下使用这个动画效果的animate</div>
    <bottom-tabbar/>
  </div>
</template>
<script>
import BottomTabbar from '../../components/BottomTabbar/BottomTabbar'
import { Cell, CellGroup, Image, Toast, Dialog } from 'vant';
import { mapState, mapActions } from 'vuex'
// import axios from "axios";
export default {
  name: 'me',
  components: {
    BottomTabbar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image,
    [Dialog.name]: Dialog
  },

  data () {
    return {
      visible: false,
      show: false
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
  },

  methods: {
    ...mapActions('category', ['createCategory']),

    async handleClick (type) {
      if (type === 'about') {
        Dialog.alert({
          title: '微帐V1.0.0',
          message: '<div>因为热爱，所以坚持</div><div>源码地址：https://github.com/Dreamsky1/bookkeeping-vant</div>'
        })
      } else if (type === 'suggest') {
        this.$router.push({
          path: '/suggest'
        })
      } else if (type === 'category') {
        this.$router.push({
          path: '/category'
        })
        // this.show = true
        // Toast('敬请期待')
      } else if (type === 'budget') {
        Toast('敬请期待')
      } else if (type === 'userInfo') {
        Toast('敬请期待')
      }
    },
    // async handleAbout () {
      // await this.createCategory({
      //   name: '奖金',
      //   image: 'bonus',
      //   typeId: 2
      // }).then(resp => {
      //   console.log('股东会撒娇', resp)
      // })
      // Toast('创建成功')
    // }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/scss/mixins';

.page-me-container {
  padding-top: 20px;
  .user-info-content{
    .user-info{
      padding-left: 5px;
      width: 100%;
      height: 100px;
      background-color: #42b983;
      @include flex(row, left, center);
      .info-detail{
        width: 208px;
        margin-left: 10px;
        .signature{
          font-size: 16px;
          margin-top: 5px;
        }
      }
    }
  }
  .more-info-content{
    margin-top: 10px;
    margin-bottom: 10px;
    .more-info{
      width: 100%;
      height: 50px;
      background-color: #42b983;
      opacity: 0.5;
    }
  }
}
</style>
