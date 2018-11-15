import i18nJSON from '../i18n.json'

export const blockShape = {
  I: [[1]]
}

export const origin = {
  I: [[-1, 1], [1, -1]],
  L: [[0, 0]],
  J: [[0, 0]],
  Z: [[0, 0]],
  S: [[0, 0]],
  O: [[0, 0]],
  T: [[0, 0], [1, 0], [-1, 1], [0, -1]]
}

export const blockType = [
  // '人', '口',
  '白', '勺'
  /*, '日', '一', '小', '大', '土',
  '十', '卜', '八', '二', '言', '辵', '月', '木', '目',
  '手', '艸', '刀', '水', '戈', '又', '儿', '王', '寸',
  '心', '女', '门', '禾', '邑', '竹', '力', '也', '贝',
  '金', '田', '厂', '里', '火', '文', '衣', '工', '隹',
  '车', '匕', '子', '山', '干', '攵', '己', '老', '页',
  '衤', */
]

export const speeds = [800, 650, 500, 370, 250, 160]

export const delays = [50, 60, 70, 80, 90, 100]

export const fillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

export const blankLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

export const blankMatrix = (() => {
  const matrix = []
  for (let i = 0; i < 20; i++) {
    matrix.push(blankLine)
  }
  return matrix
})()

export const clearPoints = [100, 300, 700, 1500]

export const StorageKey = 'VUE_TETRIS'

export const lastRecord = (() => {
  // 上一把的状态
  let data = window.localStorage.getItem(StorageKey)
  if (!data) {
    return false
  }
  try {
    if (window.btoa) {
      data = atob(data)
    }
    data = decodeURIComponent(data)
    data = JSON.parse(data)
  } catch (e) {
    if (window.console || window.console.error) {
      window.console.error('读取记录错误:', e)
    }
    return false
  }
  return data
})()

export const maxPoint = 999999

export const transform = (function() {
  const trans = [
    'transform',
    'webkitTransform',
    'msTransform',
    'mozTransform',
    'oTransform'
  ]
  const body = document.body
  return trans.filter(e => body.style[e] !== undefined)[0]
})()

export const eachLines = 20 // 每消除eachLines行, 增加速度

export const getParam = param => {
  // 获取浏览器参数
  const r = new RegExp(`\\?(?:.+&)?${param}=(.*?)(?:&.*)?$`)
  const m = window.location.toString().match(r)
  return m ? decodeURI(m[1]) : ''
}

export const lan = (() => {
  let l = getParam('lan').toLowerCase()
  if (!l && navigator.languages) {
    l = navigator.languages.find(l => i18nJSON.lan.indexOf(l) !== -1)
  }
  l = i18nJSON.lan.indexOf(l) === -1 ? i18nJSON.default : l
  return l
})()

document.title = i18nJSON.data.title[lan]

export let i18n = i18nJSON.data
