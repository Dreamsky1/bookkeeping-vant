<template>
  <div class="page page-login-container">
    <van-cell-group inset>
      <div class="header">Login</div>
      <van-form @submit="handleSubmit">
        <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block color="linear-gradient(to right, #fbc2eb, #a6c1ee)" native-type="submit" v-if="!isSubmit">提交</van-button>
          <van-button round block loading color="linear-gradient(to right, #fbc2eb, #a6c1ee)" loading-text="加载中..." v-else />
        </div>
      </van-form>
    </van-cell-group>
  </div>
</template>
<script>
import { CellGroup, Form, Field, Button, Notify } from 'vant';
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  components: {
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },

  data () {
    return {
      username: '',
      password: '',
      isSubmit: false,
      timer: null
    }
  },

  methods: {
    ...mapActions('login', ['login']),

    async handleSubmit (values) {
      this.isSubmit = true
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        try {
          await this.login(values)
          Notify({ type: 'success', message: '通知内容' });
          this.$router.push({
            path: '/user'
          })
        } catch (e) {
          console.error(e)
        }
      }, 1000)
      console.log('输出这个values', values)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/scss/mixins';

.page-login-container {
  @include flex();
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
  .header{
    font-size: 38px;
    font-weight: bold;
    text-align: center;
    line-height: 100px;
  }
}

</style>
