// 公用方法库

/**
 * 获取 cookie
 * @param {String} key  cookie键
 * @return {String} cookie值
 */
export const getCookie = (key) => {
    const reg = new RegExp(`(^|; )${key}=([^;]*)(;|$)`);
    if (process.env.VUE_ENV === 'client') {
        const arr = document.cookie.match(reg);
        if (arr) {
            return decodeURIComponent(arr[2]);
        }
        return '';
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
 * 将秒时间转换为 mm:ss
 * @param {Number} time 时间
 * @return {String}
 */
export const convertSecondToHHMMSS = (time) => {
    if (typeof time === 'number') {
        let minutes = parseInt(time / 60, 10);
        minutes = minutes > 1 ? `0${minutes}` : '00';
        let seconds = parseInt(time % 60, 10);
        seconds = seconds / 10 > 1 ? `${seconds}` : `0${seconds}`;
        return `${minutes}:${seconds}`;
    }
    console.warn('argument must be Number');
    return '00:00';
};

/**
 * 将 hh:mm:ss 转换为 秒
 * @param {String} time 时间
 * @return {Number}
 */
export const convertHHMMSSToSecond = (time) => {
    if (time && typeof time === 'string') {
        let hour = 0;
        let minute = 0;
        let second = 0;
        let total = 0;
        const arr = time.split(':');
        if (arr.length === 1) {
            [second] = arr;
        } else if (arr.length === 2) {
            [minute, second] = arr;
        } else if (arr.length === 3) {
            [hour, minute, second] = arr;
        }
        total += hour ? +hour * 3600 : 0;
        total += minute ? +minute * 60 : 0;
        total += +second;
        return total;
    }
    console.warn('argument must be String');
    return 0;
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
export const debounce = (fn, delay = 500) => {
    if (typeof fn !== 'function') {
        return new TypeError('first param must be function');
    }
    let timer = null;
    return function callback(ctx = window, ...args) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            fn.apply(ctx, args);
            timer = null;
        }, delay);
    };
};
