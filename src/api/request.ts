const BASE = '/api'

export default async function request<T = any>(
  url: string,
  options: { method?: string; headers?: Record<string, string>; data?: any; params?: Record<string, any>; [key: string]: any } = {},
): Promise<T> {
  const { method = 'GET', headers = {}, data, params, ...rest } = options

  // Build query string from params
  let fullUrl = BASE + url
  if (params && Object.keys(params).length > 0) {
    const qs = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        qs.append(k, String(v))
      }
    })
    const qstr = qs.toString()
    if (qstr) fullUrl += '?' + qstr
  }

  const fetchOptions: RequestInit = {
    method,
    credentials: 'include',
    headers: {
      ...(method !== 'GET' ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    ...rest,
  }

  if (data && method !== 'GET') {
    fetchOptions.body = JSON.stringify(data)
  }

  let res: Response
  try {
    res = await fetch(fullUrl, fetchOptions)
  } catch {
    throw new Error('网络请求失败，请检查网络连接')
  }

  if (!res.ok) {
    throw new Error(`请求失败 (${res.status})`)
  }

  let json: any
  try {
    json = await res.json()
  } catch {
    throw new Error('服务器返回了无效的响应')
  }

  // Auto-unwrap BaseResponse: code === 0 → return data
  if (json.code !== 0) {
    throw new Error(json.message || 'Unknown error')
  }

  return json.data as T
}
