import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: auth.getUser(),
    photo: null
  },
  mutations: {
    //  更新用户头像的方法 载荷 携带参数用的
    updatePhoto (state, payload) {
      state.photo = payload.photo
    },
    updateUser (state, payload) {
      state.user = payload.user // 更新数据
      auth.setUser(payload.user) // 将更新得数据同步到本低存储中
    },
    // 清空数据
    clearUser (state) {
      state.user = {}
      auth.delUser(state)
    }
  },
  actions: {

  },
  modules: {
  }
})
