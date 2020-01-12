<template>
  <div class="container">
    <van-nav-bar left-arrow title="登录" @click-left="$router.back()"></van-nav-bar>
    <!-- <van-cell-group>
      <van-field label="手机号" placeholder="请输入用户名" ></van-field>
      <van-field label="验证码" placeholder="请输入用户名" >
        <van-button slot="button" type="primary" size="small"></van-button>
      </van-field>
    </van-cell-group> -->
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
