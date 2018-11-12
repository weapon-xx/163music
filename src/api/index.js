import axios from 'axios'

const domain = 'jacksonx.cn';
// const domain = '127.0.0.1'

/** 
 * 
 * promise 缓存函数
 * @param fn 执行函数
 * @param convertParam 缓存 key 生成函数
 *
 */ 
function promiseCache(fn, convertParam) {
    if(typeof fn !== 'function') {
        console.error('first argument is not a function')
        return 
    }
    if(!promiseCache._cache) {
        promiseCache._cache = {};
    }
    const cachKey = convertParam();
    return function(...args) {
        if(!promiseCache._cache[cachKey]) {
            promiseCache._cache[cachKey] = fn(args);
        }
        return promiseCache._cache[cachKey];
    }
}

/** 
 * 首页 banner
 */ 
export const request_banner = promiseCache(function() {
    return axios.get(`//${domain}:3000/banner`).then(data => {
        return data.data
    })
}, () => 'banner')

/** 
 * 手机号登录
 */ 
export const login = params => {
    const {phone, password} = params;
    if(!phone || !password) {
        return Promise.reject({code: -1, msg: '手机号或者密码不能为空'})
    }
    return axios.get(`//${domain}:3000/login/cellphone?phone=${phone}&password=${password}`).then(data => {
        return data.data
    });
}

/** 
 * 推荐歌单
 * 
 */ 
export const request_resource = () => {
    return axios.get(`//${domain}:3000/recommend/resource`, {
        withCredentials: true
    }).then(data => {
        return data.data
    });
}