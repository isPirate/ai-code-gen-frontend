import { userLogin, userRegister, userLogout, getLoginUser, listUserVoByPage, addUser, updateUser, deleteUser, getUserById, getUserVoById } from './generated/codepilot/userController'

export const api = {
  // Auth
  login(userAccount, userPassword) {
    return userLogin({ userAccount, userPassword })
  },
  register(userAccount, userPassword, checkPassword) {
    return userRegister({ userAccount, userPassword, checkPassword })
  },
  logout() {
    return userLogout()
  },
  getLoginUser() {
    return getLoginUser()
  },

  // Users CRUD
  getUserById(id) {
    return getUserById({ id })
  },
  getUserVOById(id) {
    return getUserVoById({ id })
  },
  listUserVOPage(params) {
    return listUserVoByPage({ pageNum: 1, pageSize: 10, ...params })
  },
  addUser(userData) {
    return addUser(userData)
  },
  updateUser(userData) {
    return updateUser(userData)
  },
  deleteUser(id) {
    return deleteUser({ id })
  },
}
