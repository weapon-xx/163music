// 公用方法库

/*
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
