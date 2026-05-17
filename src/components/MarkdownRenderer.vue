<template>
  <div ref="container" class="markdown-body" v-html="rendered" @click="onClick"></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('xml', xml)

const props = defineProps({
  content: { type: String, default: '' },
})

const container = ref(null)

marked.setOptions({ breaks: true })

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function decodeHtml(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
}

function wrapCodeBlocks(html) {
  return html.replace(/<pre><code(\s+class="([^"]*)")?>([\s\S]*?)<\/code><\/pre>/g, (_, classAttr, className, code) => {
    const langMatch = className ? className.match(/language-(\w+)/) : null
    const lang = langMatch ? langMatch[1] : ''
    const rawCode = decodeHtml(code)
    const langLabel = lang ? `<span class="code-lang">${lang}</span>` : ''
    return `<div class="code-block-wrapper"><div class="code-block-header">${langLabel}<button class="copy-code-btn" data-code="${escapeAttr(rawCode)}">Copy</button></div><pre><code${classAttr || ''}>${code}</code></pre></div>`
  })
}

const rendered = computed(() => {
  if (!props.content) return ''
  const html = marked.parse(props.content, {
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value
      }
      return hljs.highlightAuto(code).value
    },
  })
  return wrapCodeBlocks(html)
})

function onClick(e) {
  const btn = e.target.closest('.copy-code-btn')
  if (!btn) return
  const code = decodeHtml(btn.dataset.code || '')
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = 'Copied!'
    btn.classList.add('copied')
    setTimeout(() => {
      btn.textContent = 'Copy'
      btn.classList.remove('copied')
    }, 2000)
  }).catch(() => {
    btn.textContent = 'Failed'
    setTimeout(() => { btn.textContent = 'Copy' }, 2000)
  })
}
</script>

<style>
.markdown-body {
  color: var(--foreground-primary);
  font-size: 14px;
  line-height: 1.7;
  word-break: break-word;
}
.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4 {
  font-family: var(--font-heading);
  font-weight: 700;
  margin: 16px 0 8px;
  color: var(--foreground-primary);
}
.markdown-body h1 { font-size: 20px; }
.markdown-body h2 { font-size: 17px; }
.markdown-body h3 { font-size: 15px; }
.markdown-body p { margin: 6px 0; }
.markdown-body ul, .markdown-body ol { padding-left: 20px; margin: 6px 0; }
.markdown-body li { margin: 2px 0; }
.markdown-body a { color: var(--accent-primary); text-decoration: underline; }
.markdown-body strong { font-weight: 600; }
.markdown-body blockquote {
  border-left: 3px solid var(--accent-primary);
  padding-left: 12px;
  margin: 8px 0;
  color: var(--foreground-secondary);
}
.markdown-body code {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 12px;
}
.markdown-body :not(pre) > code {
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--surface-secondary);
}

.code-block-wrapper {
  margin: 10px 0;
  border-radius: 8px;
  overflow: hidden;
  background: #1E1E2E;
}
.code-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  background: #181825;
}
.code-block-header .code-lang {
  font-family: 'Fira Code', monospace;
  font-size: 11px;
  color: #A6ADC8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.copy-code-btn {
  font-family: inherit;
  font-size: 11px;
  color: #A6ADC8;
  background: transparent;
  border: 1px solid #45475A;
  border-radius: 4px;
  padding: 2px 10px;
  cursor: pointer;
  transition: all 0.15s;
}
.copy-code-btn:hover {
  color: #CDD6F4;
  border-color: #89B4FA;
}
.copy-code-btn.copied {
  color: #A6E3A1;
  border-color: #A6E3A1;
}

.code-block-wrapper pre {
  margin: 0;
  border-radius: 0;
}
.code-block-wrapper pre code {
  display: block;
  padding: 14px 16px;
  overflow-x: auto;
  background: #1E1E2E;
  color: #CDD6F4;
  font-size: 12px;
  line-height: 1.6;
}

.markdown-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0;
  font-size: 13px;
}
.markdown-body th {
  background: var(--surface-secondary);
  font-weight: 600;
  padding: 8px 12px;
  text-align: left;
  border: 1px solid var(--border-subtle);
}
.markdown-body td {
  padding: 6px 12px;
  border: 1px solid var(--border-subtle);
}
.markdown-body hr {
  border: none;
  border-top: 1px solid var(--border-subtle);
  margin: 16px 0;
}

/* highlight.js — Catppuccin Mocha */
.markdown-body .hljs-keyword { color: #CBA6F7; }
.markdown-body .hljs-string { color: #A6E3A1; }
.markdown-body .hljs-number { color: #FAB387; }
.markdown-body .hljs-comment { color: #6C7086; font-style: italic; }
.markdown-body .hljs-function { color: #89B4FA; }
.markdown-body .hljs-title { color: #89B4FA; }
.markdown-body .hljs-params { color: #F2CDCD; }
.markdown-body .hljs-built_in { color: #F38BA8; }
.markdown-body .hljs-type { color: #F9E2AF; }
.markdown-body .hljs-attr { color: #89B4FA; }
.markdown-body .hljs-tag { color: #89B4FA; }
.markdown-body .hljs-name { color: #89B4FA; }
.markdown-body .hljs-selector-class { color: #A6E3A1; }
.markdown-body .hljs-selector-tag { color: #F38BA8; }
.markdown-body .hljs-attribute { color: #F9E2AF; }
.markdown-body .hljs-property { color: #89B4FA; }
.markdown-body .hljs-punctuation { color: #BAC2DE; }
.markdown-body .hljs-literal { color: #FAB387; }
.markdown-body .hljs-variable { color: #F2CDCD; }
</style>
