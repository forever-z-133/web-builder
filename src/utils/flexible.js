/**
 * 页面响应式
 * designWidth 为设计稿尺寸
 * remRatio 代表多少 rem 等于屏宽
 */
const win = window;
const doc = document;
const docEl = doc.documentElement;
const $style = doc.createElement('style');
let remRatio = null;
doc.head.appendChild($style);

function setRem() {
  const winW = docEl.getBoundingClientRect().width;
  const fontSize = winW / remRatio;
  docEl.style.fontSize = fontSize;
  $style.innerText = `html{font-size:${fontSize}px !important;}`;
}

function flexible(rem = 75) {
  remRatio = rem;
  setRem();
  win.removeEventListener('resize', setRem, !1);
  win.addEventListener('resize', setRem, !1);
}
export default flexible;
