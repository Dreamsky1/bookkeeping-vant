<template>
  <div class="page page-suggest">
    <van-nav-bar
        title="反馈与建议"
        left-text="返回"
        fixed
        left-arrow
        @click-left="$router.back()"
    />
    <van-field
        v-model="message"
        rows="2"
        autosize
        label="建议与反馈"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
    />
    <div class="bottom-button">
      <van-button type="primary" size="large" round >提交</van-button>
    </div>
  </div>
</template>
<script>
import { NavBar, Field, Button } from 'vant';
export default {
  name: 'suggest',
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button
  },

  data () {
    return {
      message: ''
    }
  },

  methods: {

  }
}
</script>
<style lang="scss">
.page-suggest{
  padding-top: 60px;
  .bottom-button{
    margin-top: 25px;
  }
}
</style>