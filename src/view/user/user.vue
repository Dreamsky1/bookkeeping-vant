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
      <van-cell icon="shop-o" title="预算管理" is-link value="内容" />
      <van-cell icon="shop-o" title="分类管理" is-link value="内容" />
      <van-cell icon="shop-o" title="反馈与建议" is-link value="内容" />
      <van-cell icon="shop-o" title="关于账计" is-link value="V1.0.0" @click="handleAbout" />
    </van-cell-group>

    <!--使用动画库测试-->
    <div class="animate__animated animate__heartBeat" v-if="visible">这个是一个测试一下使用这个动画效果的animate</div>

    <van-calendar v-model="showCalendar" :show-confirm="false"/>
    <bottom-tabbar/>
  </div>
</template>
<script>
import BottomTabbar from '../../components/BottomTabbar/BottomTabbar'
import { Cell, CellGroup, Image, Toast, Calendar } from 'vant';
import { mapState, mapActions } from 'vuex'
// import axios from "axios";
export default {
  name: 'me',
  components: {
    BottomTabbar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image,
    [Calendar.name]: Calendar
  },

  data () {
    return {
      visible: false,
      showCalendar: false
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
  },

  methods: {
    ...mapActions('category', ['createCategory']),
    async handleAbout () {
      // await this.createCategory({
      //   name: '奖金',
      //   image: 'bonus',
      //   typeId: 2
      // }).then(resp => {
      //   console.log('股东会撒娇', resp)
      // })
      Toast('创建成功')
    }
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
