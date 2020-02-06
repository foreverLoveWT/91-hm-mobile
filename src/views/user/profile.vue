<template>
  <div class="container">
    <van-nav-bar left-arrow title="编辑资料" right-text="保存"  @click-right="saveUser" @click-left="$router.back()"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像"  center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
          @click="showPhoto=true"
        />
      </van-cell>
      <van-cell is-link title="名称" @click="showName=true" :value="user.name" />
      <van-cell is-link title="性别" @click="showGender=true" :value='user.gender===0?"男":"女"'/>
      <van-cell is-link title="生日" @click="showData" :value="user.birthday" />
    </van-cell-group>
    <!-- 头像弹层 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <!-- 内容 -->
      <!-- 1 本地相册选择图片 -->
      <!-- 2 拍照 -->
       <van-cell is-link title="本地相册选择图片" @click="openChangeFile"></van-cell>
       <van-cell is-link title="拍照"></van-cell>
    </van-popup>
    <!-- 弹昵称 -->
    <van-popup round :close-on-click-overlay="false" v-model="showName" style="width:80%">
       <!-- 编辑用户昵称  双向绑定用户的昵称-->
       <van-field :error-message="nameMsg" v-model.trim="user.name" type='textarea'  rows="4"></van-field>
       <van-button type="info"  size="large" block  @click="btnName">确定</van-button>
    </van-popup>
    <!-- 性别弹层 -->
    <van-action-sheet @select="selectItem" :actions="actions" v-model="showGender" cancel-text="取消"></van-action-sheet>
    <!-- 生日弹层 -->
    <van-popup v-model="showBirthDay" position="bottom">
      <van-datetime-picker
           v-model="currentDate"
           type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showBirthDay=false"
          @confirm="confirmDate"
         />
    </van-popup>
    <input ref="myFile" @change="upload()" type="file" style="display:none">
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getUserProfile, updateImg, saveUserInfo } from '@/api/user'
export default {
  name: 'user-profile',
  data () {
    return {
      showPhoto: false,
      showName: false,
      showBirthDay: false,
      showGender: false,
      actions: [{ name: '男' }, { name: '女' }],
      minDate: new Date(1990, 1, 1),
      maxDate: new Date(),
      currentDate: new Date(), // 当前时间
      user: {
        name: '',
        gender: 1,
        birthday: ''
      },
      nameMsg: ''
    }
  },
  created () {
    this.getUserProfile()
  },
  methods: {
    // 昵称点击事件
    btnName () {
      if (this.user.name.length < 1 || this.user.name.length > 7) {
        this.nameMsg = '您的用户昵称不符合1-7的长度要求'
        return false
      }
      // 符合要求讲提示信息清空
      this.nameMsg = ''
      this.showName = false
    },
    selectItem (item) {
      this.user.gender = item.name === '男' ? 0 : 1// 判断得到当前得性别
      this.showGender = false
    },
    confirmDate (data) {
      this.user.birthday = dayjs(data).format('YYYY-MM-DD')
      this.showBirthDay = false
    },
    showData () {
      this.showBirthDay = true
      this.currentDate = new Date(this.user.birthday)
    },
    async getUserProfile () {
      let data = await getUserProfile()
      this.user = data
    },
    // 图片文件上传
    openChangeFile () {
      this.$refs.myFile.click()
    },
    // 选择图片之后上传
    async upload () {
      let data = new FormData()
      data.append('photo', this.$refs.myFile.files[0])
      let result = await updateImg(data)
      this.user.photo = result.photo
      this.showPhoto = false
    },
    // 保存用户编辑
    async saveUser () {
      try {
        await saveUserInfo({ ...this.user, photo: null })
        this.$mynotify({ type: 'success', message: '保存成功' })
        this.$router.push('/user')
      } catch (error) {
        this.$mynotify({ type: 'danger', message: '保存失败' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
