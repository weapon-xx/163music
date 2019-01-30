// 公用方法库

/**
 * 获取 cookie
 * @param {String} key  cookie键
 * @return {String} cookie值
 */
export const getCookie = (key) => {
  const reg = new RegExp(`(^|; )${key}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) {
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
  if (num) {
    const str = String(num);
    if (str.length > 5) {
      return str.replace(/\d{4}$/, '万');
    }
    return str;
  }
  return '';
};

/**
 * 将秒时间转换 -> 分钟:秒
 * @param {Number} time 时间
 * @return {String}
 */
export const handleTime = (time) => {
  if (time) {
    let minutes = `${parseInt(time / 60, 10)}`;
    minutes = minutes.length > 1 ? minutes : `0${minutes}`;
    let seconds = `${time % 60}`;
    seconds = seconds.length > 1 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
  }
  return '00:00';
};

/**
 * 将 Date 对象转换为时间 ymd-hms
 * @param {Date} data 对象
 * @return {String}
 */
export const convertDateToTime = function convertDateToTime(date) {
  if (date.constructor !== Date) { return ''; }
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
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
  return function callback() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function handler(...args) {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
};
