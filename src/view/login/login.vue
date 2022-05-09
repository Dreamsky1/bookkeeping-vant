<template>
  <div class="page page-login-container">
    <van-cell-group inset>
      <div class="header">{{ currentMode }}</div>
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
        <div class="to-register" v-if="currentMode === 'Login'">没有账号，<a @click="handleRegister">注册</a>?</div>
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
      timer: null,
      currentMode: 'Login'
    }
  },

  methods: {
    ...mapActions('user', ['login', 'register']),

    async handleSubmit (values) {
      this.isSubmit = true
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        try {
          if (this.currentMode === 'Register') {
            await this.register(values).then(() => {
              Notify({ type: 'success', message: '注册成功，去登陆吧' })
              this.currentMode = 'Login'
            }).catch((e) => {
              Notify({ type: 'danger', message: e.msg })
              this.isSubmit = false
            })
          } else {
            await this.login(values).then(() => {
              Notify({ type: 'success', message: '登录成功' });
              this.$router.push({
                path: '/user'
              })
            }).catch((e) => {
              Notify({ type: 'danger', message: e.msg })
              this.isSubmit = false
            })
          }
        } catch (e) {
          console.error(e)
        }
      }, 1000)
    },

    handleRegister () {
      this.currentMode = 'Register'
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
  .to-register{
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
    a{
      color: skyblue;
    }
  }
}

</style>
