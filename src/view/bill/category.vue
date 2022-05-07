<template>
  <div class="page page-category">
    <van-nav-bar
        title="分类管理"
        left-text="返回"
        fixed
        left-arrow
        @click-left="$router.back()"
    />
    <div class="content">
      <van-radio-group v-model="typeId">
        <van-radio name="1">支出</van-radio>
        <van-radio name="2">收入</van-radio>
      </van-radio-group>
      <van-field v-model="name" label="名称" placeholder="请输入分类名称" />
      <van-field v-model="image" label="图片" placeholder="请输入分类名称" />

      <van-button type="primary" @click="handleSubmit" size="large">提交</van-button>
    </div>
  </div>
</template>
<script>
import { Field, Radio, RadioGroup, Button, NavBar } from 'vant';
import { mapActions } from 'vuex'
export default {
  name: 'Category',

  components: {
    [Field.name]: Field,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Button.name]: Button,
    [NavBar.name]: NavBar
  },

  data () {
    return {
      name: '',
      typeId: 1,
      image: ''
    }
  },

  methods: {
    ...mapActions('category', ['createCategory']),

    async handleSubmit () {
      await this.createCategory({
        name: this.name,
        image: this.image,
        typeId: this.typeId
      })
      // console.log('这个', this.name, this.typeId)
    }
  }
}
</script>
<style>
.content{
  margin-top: 60px;
}
</style>
