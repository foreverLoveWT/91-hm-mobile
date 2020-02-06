import router from '@/router'
import store from '@/store'

router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    let toPath = { path: '/login', query: { redirectUrl: to.fullPath } }
    next(toPath)
  } else {
    next()
  }
})

export default router
