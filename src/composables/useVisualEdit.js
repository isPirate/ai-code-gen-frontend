import { ref } from 'vue'

const HOVER_CLASS = 've-hover'
const SELECTED_CLASS = 've-selected'
const STYLE_ID = 've-style'
const EDIT_ROOT_CLASS = 've-edit-root'

// 注入到预览 iframe 的样式：hover 浅橙边框、选中深橙边框 + 轻微着色、编辑模式十字光标。
// 预览 iframe 与父页面同源（/api/static/...），可直接操作其 document。
const INJECT_STYLE = `
  .${EDIT_ROOT_CLASS}, .${EDIT_ROOT_CLASS} * { cursor: crosshair !important; }
  .${HOVER_CLASS} { outline: 2px solid rgba(255, 92, 0, 0.45); outline-offset: -2px; }
  .${SELECTED_CLASS} { outline: 2px solid #FF5C00; outline-offset: -2px; box-shadow: inset 0 0 0 9999px rgba(255, 92, 0, 0.05); }
`

function isElementNode(node) {
  return node && node.nodeType === Node.ELEMENT_NODE
}

// 向上构造 CSS 路径（最多 5 层，遇 id 即具备唯一性则截断；兄弟存在同名标签时补 :nth-of-type）
function buildSelector(el) {
  const parts = []
  let node = el
  while (isElementNode(node) && parts.length < 5) {
    let sel = node.tagName.toLowerCase()
    if (node.id) {
      parts.unshift(sel + '#' + CSS.escape(node.id))
      break
    }
    const parent = node.parentElement
    if (parent) {
      const sameTag = Array.from(parent.children).filter(c => c.tagName === node.tagName)
      if (sameTag.length > 1) sel += `:nth-of-type(${sameTag.indexOf(node) + 1})`
    }
    parts.unshift(sel)
    if (node.tagName === 'BODY' || node.tagName === 'HTML') break
    node = node.parentElement
  }
  return parts.join(' > ')
}

// 提取给 LLM / chip 展示用的元素描述符
function describeElement(el, selId) {
  const text = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80)
  return {
    selId,
    tag: el.tagName.toLowerCase(),
    domId: el.id || '',
    // 过滤可视化编辑自身注入的 ve-* 类，避免污染提示词
    classes: el.classList ? Array.from(el.classList).filter(c => !c.startsWith('ve-')).slice(0, 8) : [],
    text,
    selector: buildSelector(el),
  }
}

// 生成拼接到用户提示词的选中元素上下文块
function buildSelectionContext(elements) {
  const lines = elements.map((e, i) => {
    const attrs = [e.tag]
    if (e.domId) attrs.push(`id="${e.domId}"`)
    if (e.classes.length) attrs.push(`class="${e.classes.join(' ')}"`)
    if (e.text) attrs.push(`text="${e.text}"`)
    return `${i + 1}. <${attrs.join(' ')}> (selector: ${e.selector})`
  })
  return `[Visual edit — user selected ${elements.length} element(s) in the preview page, apply the request below to these elements]\n${lines.join('\n')}`
}

export function useVisualEdit(iframeRef) {
  const editMode = ref(false)
  const selectedElements = ref([])

  // 非响应式状态：iframe 内的 DOM 引用与已挂载的 document（刷新后为新 document，需重新 attach）
  let attachedDoc = null
  let hoveredEl = null
  let selSeq = 0
  const elMap = new Map()

  function handleMouseOver(e) {
    if (!isElementNode(e.target)) return
    if (hoveredEl) hoveredEl.classList.remove(HOVER_CLASS)
    hoveredEl = e.target === attachedDoc.documentElement ? null : e.target
    hoveredEl?.classList.add(HOVER_CLASS)
  }

  function handleMouseOut(e) {
    if (!isElementNode(e.target) || e.target !== hoveredEl) return
    hoveredEl.classList.remove(HOVER_CLASS)
    hoveredEl = null
  }

  function handleClick(e) {
    // capture 阶段拦截，阻止预览页面自身的跳转 / 交互
    e.preventDefault()
    e.stopPropagation()
    if (!isElementNode(e.target) || e.target === attachedDoc.documentElement) return

    const found = selectedElements.value.find(info => elMap.get(info.selId) === e.target)
    if (found) {
      e.target.classList.remove(SELECTED_CLASS)
      elMap.delete(found.selId)
      selectedElements.value = selectedElements.value.filter(info => info.selId !== found.selId)
      return
    }
    const info = describeElement(e.target, ++selSeq)
    elMap.set(info.selId, e.target)
    e.target.classList.add(SELECTED_CLASS)
    selectedElements.value = [...selectedElements.value, info]
  }

  function injectStyle(doc) {
    if (doc.getElementById(STYLE_ID)) return
    const style = doc.createElement('style')
    style.id = STYLE_ID
    style.textContent = INJECT_STYLE
    ;(doc.head || doc.documentElement).appendChild(style)
  }

  // 向当前 iframe document 注入样式与事件监听（重复调用安全：同一 document 只挂载一次）
  function attach() {
    const doc = iframeRef?.value?.contentDocument
    if (!doc || doc === attachedDoc) return
    detach()
    attachedDoc = doc
    injectStyle(doc)
    doc.documentElement.classList.add(EDIT_ROOT_CLASS)
    doc.addEventListener('mouseover', handleMouseOver)
    doc.addEventListener('mouseout', handleMouseOut)
    doc.addEventListener('click', handleClick, true)
    // 重新注入后为仍处于选中态的元素补上边框（iframe 刷新会丢失 class）
    selectedElements.value.forEach(info => {
      const el = doc.querySelector(info.selector)
      if (el) {
        elMap.set(info.selId, el)
        el.classList.add(SELECTED_CLASS)
      }
    })
  }

  // 移除监听与 hover 态；保留选中元素的边框与 chips（由用户手动移除或发送时清空）
  function detach() {
    if (!attachedDoc) return
    attachedDoc.removeEventListener('mouseover', handleMouseOver)
    attachedDoc.removeEventListener('mouseout', handleMouseOut)
    attachedDoc.removeEventListener('click', handleClick, true)
    attachedDoc.documentElement.classList.remove(EDIT_ROOT_CLASS)
    if (hoveredEl) {
      hoveredEl.classList.remove(HOVER_CLASS)
      hoveredEl = null
    }
    attachedDoc = null
  }

  function toggleEditMode() {
    if (editMode.value) {
      editMode.value = false
      detach()
    } else {
      editMode.value = true
      attach()
    }
  }

  function removeSelected(selId) {
    const el = elMap.get(selId)
    el?.classList.remove(SELECTED_CLASS)
    elMap.delete(selId)
    selectedElements.value = selectedElements.value.filter(info => info.selId !== selId)
  }

  // 清空全部选中并退出编辑模式（发送消息时调用）
  function reset() {
    elMap.forEach(el => el.classList.remove(SELECTED_CLASS))
    elMap.clear()
    selectedElements.value = []
    editMode.value = false
    detach()
  }

  return { editMode, selectedElements, toggleEditMode, removeSelected, attach, reset, buildSelectionContext }
}
