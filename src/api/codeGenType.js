// 后端 App.codeGenType 取值
export const CodeGenType = {
  HTML: 'html',
  MULTI_FILE: 'multi_file',
  VUE_PROJECT: 'vue_project',
}

// 枚举元数据（对应后端枚举：value + label；previewDist 标记产物是否在 dist 子目录）
export const CODE_GEN_TYPES = [
  { value: CodeGenType.HTML, label: 'HTML', previewDist: false },
  { value: CodeGenType.MULTI_FILE, label: 'Multi File', previewDist: false },
  { value: CodeGenType.VUE_PROJECT, label: 'Vue Project', previewDist: true },
]

export function getCodeGenTypeLabel(value) {
  return CODE_GEN_TYPES.find(t => t.value === value)?.label || ''
}

// 预览静态资源基础路径；Vue 工程产物位于 dist 目录下
export function buildPreviewPath(codeGenType, id) {
  const meta = CODE_GEN_TYPES.find(t => t.value === codeGenType)
  const suffix = meta?.previewDist ? '/dist' : ''
  return `/api/static/${codeGenType}_${id}${suffix}/`
}

// 部署 URL 基础域名（与后端 AppConstant.CODE_DEPLOY_HOST 保持一致）
export const DEPLOY_HOST = 'http://localhost'

// 部署 URL = 域名 + 6 位 deployKey（后端 AppServiceImpl.deployApp 返回格式 %s/%s/）
export function buildDeployUrl(deployKey) {
  return `${DEPLOY_HOST}/${deployKey}/`
}
