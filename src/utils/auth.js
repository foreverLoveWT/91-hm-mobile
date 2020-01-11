const USER_TOKEN = 'hm-toutiao-91'

export function setUser (user) {
  window.localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
export function getUser () {
  return JSON.parse(window.localStorage.getItem(USER_TOKEN || {}))
}
export function delUser () {
  window.localStorage.removeItem(USER_TOKEN)
}
