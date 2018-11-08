import axios from 'axios'

function promiseCache(fn, generateKey) {
    const key = generateKey();
    if(!!promiseCache[key]) {
        return promiseCache[key];
    } else {
        return fn.then(data => {
            promiseCache[key] = data;
            return data
        })
    }
}


export const request_banner = () => {
    return promiseCache(axios.get('//jacksonx.cn:3000/banner'), () => 'banner');
}