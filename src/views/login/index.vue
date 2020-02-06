<template>
  <div class="container">
    <van-nav-bar left-arrow title="登录" @click-left="$router.back()"></van-nav-bar>
    <van-cell-group>
      <van-field @blur="checkMobile" label="手机号" v-model="loginForm.mobile" placeholder="请输入用户名" :error-message="errMes.mobile"></van-field>
      <van-field @blur="checkCode" label="验证码" v-model="loginForm.code" placeholder="请输入用户名" :error-message="errMes.code">
        <van-button slot="button" type="primary" size="small">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn-box">
      <van-button type="info" size="small" round block @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { login } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      errMes: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkMobile () {
      if (!this.loginForm.mobile) {
        this.errMes.mobile = '手机号不能为空'
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errMes.mobile = '手机格式不正确'
        return false
      }
      this.errMes.mobile = ''
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errMes.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errMes.code = '验证码为6位'
        return false
      }
      this.errMes.code = ''
      return true
    },
    // 登陆方法
    async login () {
      if (this.checkMobile() && this.checkCode()) {
        const data = await login(this.loginForm)
        this.updateUser({ user: data })
        this.$mynotify({ type: 'success', message: '登陆成功' })
        let { redirectUrl } = this.$route.query
        this.$router.push(redirectUrl || '/')
      }
    },
    ...mapMutations(['updateUser'])
  }
}
</script>

<style lang="less" scoped>
.btn-box{
  padding:20px;
}
</style>
