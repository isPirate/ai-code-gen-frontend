import { userLogin, userRegister, userLogout, getLoginUser, listUserVoByPage, addUser, updateUser, deleteUser, getUserById, getUserVoById } from './generated/codepilot/userController'
import { addApp, updateApp, deleteApp, getAppVoById, listMyAppVoByPage, listGoodAppVoByPage, deployApp, deleteAppByAdmin, getAppVoByIdByAdmin, listAppVoByPageByAdmin, updateAppByAdmin } from './generated/codepilot/appController'

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

  // Apps CRUD
  addApp(data) {
    return addApp(data)
  },
  updateApp(data) {
    return updateApp(data)
  },
  deleteApp(id) {
    return deleteApp({ id })
  },
  getAppVOById(id) {
    return getAppVoById({ id })
  },
  listMyAppVOPage(params) {
    return listMyAppVoByPage(params)
  },
  listGoodAppVOPage(params) {
    return listGoodAppVoByPage(params)
  },
  deployApp(data) {
    return deployApp(data)
  },

  // Apps Admin
  deleteAppByAdmin(id) {
    return deleteAppByAdmin({ id })
  },
  getAppVOByIdByAdmin(id) {
    return getAppVoByIdByAdmin({ id })
  },
  listAppVOPageByAdmin(params) {
    return listAppVoByPageByAdmin(params)
  },
  updateAppByAdmin(data) {
    return updateAppByAdmin(data)
  },

  // SSE chat for code generation
  sseChatToGenCode(appId, message, onChunk, onDone, onError) {
    const params = new URLSearchParams({ appId: String(appId), message })
    const url = `/api/app/chat/gen/code?${params}`

    const es = new EventSource(url, { withCredentials: true })
    let closed = false

    es.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data)
        if (parsed.d !== undefined) {
          onChunk(parsed.d)
        }
      } catch {
        // skip non-JSON data
      }
    }

    es.addEventListener('done', () => {
      closed = true
      es.close()
      onDone()
    })

    es.onerror = () => {
      if (closed) return
      es.close()
      if (onError) {
        onError(new Error('SSE connection failed'))
      }
    }
  },
}
