import { userLogin, userRegister, userLogout, getLoginUser, listUserVoByPage, addUser, updateUser, deleteUser, getUserById, getUserVoById } from './generated/codepilot/userController'
import { addApp, updateApp, deleteApp, getAppVoById, listMyAppVoByPage, listGoodAppVoByPage, deployApp, deleteAppByAdmin, getAppVoByIdByAdmin, listAppVoByPageByAdmin, updateAppByAdmin } from './generated/codepilot/appController'
import { listAppChatHistory } from './generated/codepilot/chatHistoryController'

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
    // 默认按创建时间倒序（最新创建的在前），走 idx_createTime 索引；调用方可覆盖
    return listMyAppVoByPage({ pageNum: 1, pageSize: 10, sortField: 'createTime', sortOrder: 'descend', ...params })
  },
  listGoodAppVOPage(params) {
    return listGoodAppVoByPage(params)
  },
  deployApp(data) {
    return deployApp(data)
  },

  // 下载应用代码 ZIP：二进制响应无法走统一 request（固定按 JSON 解析），直接 fetch 并
  // 从 Content-Disposition 解析文件名（后端返回 attachment; filename="xxx.zip"）
  async downloadAppCode(appId, fallbackName = 'app') {
    const res = await fetch(`/api/app/download/${appId}`, { credentials: 'include' })

    // 出错时后端可能返回 JSON（BaseResponse），优先透出 message
    const contentType = res.headers.get('Content-Type') || ''
    if (contentType.includes('application/json')) {
      let message = `下载失败 (${res.status})`
      try {
        const json = await res.json()
        if (json.message) message = json.message
      } catch {
        // keep default message
      }
      throw new Error(message)
    }
    if (!res.ok) {
      throw new Error(`下载失败 (${res.status})`)
    }

    const disposition = res.headers.get('Content-Disposition') || ''
    const match = disposition.match(/filename="?([^";]+)"?/i)
    let fileName = match ? match[1] : `${fallbackName}.zip`
    try {
      fileName = decodeURIComponent(fileName)
    } catch {
      // 文件名未编码时直接使用原始值
    }

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    return fileName
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

  // Chat History
  listAppChatHistory(appId, pageSize = 10, lastCreateTime = null) {
    const params = { appId, pageSize }
    if (lastCreateTime) params.lastCreateTime = lastCreateTime
    return listAppChatHistory(params)
  },

  // SSE chat for code generation
  sseChatToGenCode(appId, message, onChunk, onDone, onError, onThinking) {
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

    // 深度思考流走自定义 thinking 事件（命名事件不会触发 onmessage）
    es.addEventListener('thinking', (event) => {
      try {
        const parsed = JSON.parse(event.data)
        if (parsed.d !== undefined && onThinking) {
          onThinking(parsed.d)
        }
      } catch {
        // skip non-JSON data
      }
    })

    es.addEventListener('done', () => {
      closed = true
      es.close()
      onDone()
    })

    es.onerror = () => {
      if (closed) return
      closed = true
      es.close()
      if (onError) {
        onError(new Error('SSE connection failed'))
      }
    }

    return es
  },
}
