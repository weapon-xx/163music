import axios from 'axios'

// const domain = 'jacksonx.cn';
const domain = '192.168.31.178'

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

export const request_banner = promiseCache(function() {
    return axios.get(`//${domain}:3000/banner`).then(data => {
        return data.data
    })
}, () => 'banner')

export const login = (params) => {
    const {phone, password} = params;
    if(!phone || !password) {
        return Promise.reject({data: {code: -1, msg: '手机号或者密码不能为空'}})
    }
    return axios.get(`//${domain}:3000/login/cellphone?phone=${phone}&password=${password}`).then(data => {
        return data.data
    });
}