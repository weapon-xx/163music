// 公用方法库

/**
 * 获取 cookie
 * @param {String} key  cookie键
 * @return {String} cookie值
 */
export const getCookie = (key) => {
  const reg = new RegExp(`(^|; )${key}=([^;]*)(;|$)`); let
    arr;
  if (arr = document.cookie.match(reg)) {
    return decodeURIComponent(arr[2]);
  }
  return '';
};

/**
 * 判断是否登录
 * @param {String} key  cookie键
 * @return {Boolean} 是否登录
 */
export const isLogin = () => {
  if (getCookie('__csrf')) {
    return true;
  }
  return false;
};

/**
 * 字符串后四位转化为万
 * @param {String} num
 * @return {String}
 */
export const handleCount = (num) => {
  if (!num) {
    console.error('参数不能为空');
    return;
  }
  const str = String(num);
  if (str.length > 5) {
    return str.replace(/\d{4}$/, '万');
  }
  return str;
};

/**
 * 将秒时间转换 -> 分钟:秒
 * @param {Number} time 时间
 * @return {String}
 */
export const handleTime = (time) => {
  if (time) {
    let minutes = `${parseInt(time / 60)}`;
    minutes = minutes.length > 1 ? minutes : `0${minutes}`;
    let seconds = `${time % 60}`;
    seconds = seconds.length > 1 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
  }
  return '00:00';
};

/**
 * 函数节流
 * @param {Function} fn 执行函数
 * @param {Number} delay 延时时长
 * @param {Object} context 函数执行上下文
 * @return {Function}
 */
export const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
};
