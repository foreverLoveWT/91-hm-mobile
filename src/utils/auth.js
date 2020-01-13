const USER_TOKEN = 'hm-toutiao-91'

export function setUser (user) {
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_TOKEN) || '{}')
}
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}
