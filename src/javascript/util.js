// 公用方法库

/**
 * 获取 cookie
 * @param {String} key  cookie键
 * @return {String} cookie值
 */
export const getCookie = key => {
    let reg = new RegExp(`(^|; )${key}=([^;]*)(;|$)`), arr;
        if(arr = document.cookie.match(reg)) {
            return decodeURIComponent(arr[2])
        } else {
            return ''
        }
}

/** 
 * 判断是否登录
 * @param {String} key  cookie键
 * @return {Boolean} 是否登录
 */
export const isLogin = () => {
    if(!!getCookie('__csrf')) {
        return true
    } else {
        return false
    }
}

/** 
 * 字符串后四位转化为万
 * @param {String} num  
 * @return {String} 
 */
export const handleCount = num => {
    if(!num) {
        return 0
    }
    const str = String(num)
    if(str.length > 5) {
        return str.replace(/\d{4}$/, '万')
    } else {
        return str
    }
}

/**
 * 将秒时间转换 -> 分钟:秒
 * @param {Number} time 时间 
 * @return {String} time
 */
export const handleTime = time => {
    if(!!time) {
        let minutes = `${parseInt(time / 60)}`
        minutes = minutes.length > 1 ? minutes : `0${minutes}`
        let seconds = `${time % 60}`
        seconds = seconds.length > 1 ? seconds : `0${seconds}`
        return `${minutes}:${seconds}` 
    } else {
        return `00:00`
    }
}