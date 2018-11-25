// 公用方法库

/*
* 获取 cookie
* @params key String cookie键
* @return String cookie值
*/
export const getCookie = key => {
    let reg = new RegExp(`(^|; )${key}=([^;]*)(;|$)`), arr;
        if(arr = document.cookie.match(reg)) {
            return decodeURIComponent(arr[2])
        } else {
            return ''
        }
}

/*
* 判断是否登录
* @params key String cookie键
* @return Booleab 是否登录
*/
export const isLogin = () => {
    if(!!getCookie('__csrf')) {
        return true
    } else {
        return false
    }
}

/*
* 字符串后四位转化为万
* @params key String 
* @return String 
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