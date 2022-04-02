<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <div class="xui-test">
      <div class="xui-center" @click="onClickTo">测试之前的业务</div>
    </div>
    <div class="xui-name">
      <div class="xui-center" @click="onClickTestLogin">nice</div>
    </div>
  </div>
</template>

<script>
import TestSer from "../service/login_service";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  data() {
    return {

    }
  },

  methods: {
    onClickTo () {
      this.$router.push({
        path: '/home'
      })
    },
    async onClickTestLogin () {
      console.log('点击触发了')
      await TestSer.login('李白1', 1234)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import 'src/scss/mixins';
body{
  margin: 0;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.xui-test{
  width: 100px;
  height: 100px;
  background-color: blue;
  @include text-nowrap(100px);
  .xui-center{
    font-size: 20px;
    color: red;
  }
}
.xui-name{
  margin-left: auto;
  @extend .xui-test;
}
</style>
