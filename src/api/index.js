import axios from 'axios'
axios.defaults.withCredentials = true;

// const domain = '//163music.jacksonx.cn/api'
const domain = '//jacksonx.cn:3000'

/** 
 * promise 缓存函数
 * @param {Function} fn 执行函数
 * @param {Function} convertParam 缓存 key 生成函数
 * @return {Function}
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
 * @return {Promise}
 */ 
export const requestBanner = promiseCache(function() {
    return axios.get(`${domain}/banner`).then(data => {
        return data.data
    })
}, () => 'banner')

/** 
 * 手机号登录
 * @param {Object} params 参数对象
 * @return {Promise}
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
 * 获取推荐歌单
 * @return {Promise}
 */ 
export const requestResource = () => {
    return axios.request({
        method: 'get',
        url: `${domain}/recommend/resource`
    }).then(data => {
        return data.data
    });
}

/** 
 * 获取歌单详情
 * @param {Number} id  歌单id
 * @return {Promise}
 */ 
export const requestPlaylistDetail = async id => {
    return axios.request({
        method: 'get',
        url: `${domain}/playlist/detail?id=${id}`
    }).then(data => {
        return data.data
    });
}

/** 
 * 获取歌单详情
 * @param {Number} id  歌单id
 * @return {Promise}
 */ 
export const requestSongDetail = async id => {
    return axios.get(`${domain}/song/detail?ids=${id}`).then(data => {
        return data.data
    });
}

/** 
 * 获取歌单 url
 * @param {Number} id  歌单id
 * @return {Promise}
 */ 
export const requestSongUrl = async id => {
    return axios.get(`${domain}/song/url?id=${id}`).then(data => {
        return data.data
    });
}

/** 
 * 获取登录状态
 * @return {Promise}
 */ 
export const requestLoginStatus = async () => {
    return axios.get(`${domain}/login/status`).then(data => {
        return data.data
    });
}

/** 
 * 获取用户创建歌单
 * @param {Number} useId 用户id
 * @return {Promise}
 */ 
export const requestUserPlaylist = async uid => {
    return axios.get(`${domain}/user/playlist?uid=${uid}`).then(data => {
        return data.data
    });
}

/** 
 * 获取用户信息
 * @param {Number} useId 用户id
 * @return {Promise}
 */ 
export const requestUserDetail = async uid => {
    return axios.get(`${domain}/user/detail?uid=${uid}`).then(data => {
        return data.data
    });
}

/** 
 * 获取动态消息
 * @return {Promise}
 */ 
export const requestEvent= async () => {
    return axios.get(`${domain}/event`).then(data => {
        return data.data
    });
}

/** 
 * 获取歌词
 * @param {Number} id 歌曲id
 * @return {Promise}
 */ 
export const requestLyric= async id => {
    return axios.get(`${domain}/lyric?id=${id}`).then(data => {
        return data.data
    });
}

/** 
 * 搜索建议
 * @param {String} keyword
 * @return {Promise}
 */ 
export const requestSuggestKeyword = async keywords => {
    return axios.get(`${domain}/search/suggest?keywords=${keywords}`).then(data => {
        return data.data
    });
}

/** 
 * 搜索
 * @param {String} keyword
 * @return {Promise}
 */ 
export const requestSearchByKeyword = async keywords => {
    return axios.get(`${domain}/search?keywords= ${keywords}`).then(data => {
        return data.data
    });
}