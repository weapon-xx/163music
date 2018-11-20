import axios from 'axios'
axios.defaults.withCredentials = true;

const domain = '//163music.jacksonx.cn/api'
// const domain = '//jacksonx.cn:3000'

/** 
 * 
 * promise 缓存函数
 * @param fn 执行函数
 * @param convertParam 缓存 key 生成函数
 * @return function  
 */ 
function promiseCache(fn, convertParam) {
    if(typeof fn !== 'function') {
        console.error('first argument is not a function')
        return 
    }
    if(!promiseCache._cache) {
        promiseCache._cache = {}
    }
    const cachKey = convertParam()
    return function(...args) {
        if(!promiseCache._cache[cachKey]) {
            promiseCache._cache[cachKey] = fn(args)
        }
        return promiseCache._cache[cachKey]
    }
}

/** 
 * 首页 banner
 * @return Promise
 */ 
export const request_banner = promiseCache(function() {
    return axios.get(`${domain}/banner`).then(data => {
        return data.data
    })
}, () => 'banner')

/** 
 * 手机号登录
 * @params params Object 参数对象
 * @return Promise
 */ 
export const login = params => {
    const {phone, password} = params;
    if(!phone || !password) {
        return Promise.reject({code: -1, msg: '手机号或者密码不能为空'})
    }
    return axios.get(`${domain}/login/cellphone?phone=${phone}&password=${password}`).then(data => {
        return data.data
    }).catch(err => {
        return err.response
    })
}

/** 
 * 推荐歌单
 * @return Promise
 */ 
export const request_resource = () => {
    return axios.request({
        method: 'get',
        withCredentials: true,
        url: `${domain}/recommend/resource`
    }).then(data => {
        return data.data
    });
}