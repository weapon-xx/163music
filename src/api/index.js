import requestServer from '../javascript/requestServer';

/**
 * promise 缓存函数
 * @param {Function} fn 执行函数
 * @param {Function} convertParam 缓存 key 生成函数
 * @param {Object} ctx 指向上下文
 * @return {Function}
 */
function promiseCache(fn, convertParam, ctx) {
    if (typeof fn !== 'function') {
        return new TypeError('first argument is not a function', 10);
    }
    if (!promiseCache.cache) {
        promiseCache.cache = Object.create(null);
    }
    return function handle(...args) {
        const cachKey = convertParam.apply(ctx, args);
        if (!promiseCache.cache[cachKey]) {
            promiseCache.cache[cachKey] = fn.apply(ctx, args);
        }
        return promiseCache.cache[cachKey];
    };
}

/**
 * 清空 promise 缓存函数
 */
export function cleanPromiseCache() {
    if (promiseCache.cache) {
        promiseCache.cache = Object.create(null);
    }
}

/**
 * 首页 banner
 * @return {Promise}
 */
export const requestBanner = promiseCache(() => requestServer.get('/banner'), () => 'banner');

/**
 * 手机号登录
 * @param {Object} params 参数对象
 * @return {Promise}
 */
export const login = (params) => {
    const { phone, password } = params;
    if (!phone || !password) {
        return Promise.reject(new Error('手机号或者密码不能为空'));
    }
    const param = {
        method: 'get',
        url: `/login/cellphone?phone=${phone}&password=${password}`,
    };
    return requestServer.request(param);
};

/**
 * 获取推荐歌单
 * @return {Promise}
 */
export const requestResource = promiseCache((cookie) => {
    const params = {
        method: 'get',
        url: '/recommend/resource',
    };
    if (cookie) {
        params.headers = {
            cookie,
        };
    }
    return requestServer.request(params);
}, () => 'resource');

/**
 * 获取歌单详情
 * @param {Number} id  歌单id
 * @return {Promise}
 */
export const requestPlaylistDetail = promiseCache(id => requestServer.request({
    method: 'get',
    url: `/playlist/detail?id=${id}`,
}), id => `PlaylistDetail-${id}`);

/**
 * 获取歌单详情
 * @param {Number} id  歌单id
 * @return {Promise}
 */
export const requestSongDetail = promiseCache(id => requestServer.get(`/song/detail?ids=${id}`), id => `songDetail-${id}`);

/**
 * 获取歌曲 url
 * @param {Number} id  歌单id
 * @return {Promise}
 */
export const requestSongUrl = promiseCache(id => requestServer.get(`/song/url?id=${id}`), id => `songUrl-${id}`);

/**
 * 获取登录状态
 * @return {Promise}
 */
export const requestLoginStatus = (cookie) => {
    const param = {
        method: 'get',
        url: '/login/status',
    };
    if (cookie) {
        param.headers = {
            cookie,
        };
    }
    return requestServer.request(param);
};

/**
 * 获取用户创建歌单
 * @param {Number} useId 用户id
 * @return {Promise}
 */
export const requestUserPlaylist = promiseCache((uid, cookie) => {
    const param = {
        method: 'get',
        url: `/user/playlist?uid=${uid}`,
    };
    if (cookie) {
        param.headers = {
            cookie,
        };
    }
    return requestServer.request(param);
}, uid => `userPlaylist-${uid}`);

/**
 * 获取用户信息
 * @param {Number} useId 用户id
 * @return {Promise}
 */
export const requestUserDetail = promiseCache((uid, cookie) => {
    const param = {
        method: 'get',
        url: `/user/detail?uid=${uid}`,
    };
    if (cookie) {
        param.headers = {
            cookie,
        };
    }
    return requestServer.request(param);
}, uid => `userDetail-${uid}`);

/**
 * 获取动态消息
 * @return {Promise}
 */
export const requestEvent = (cookie) => {
    const param = {
        method: 'get',
        url: '/event',
    };
    if (cookie) {
        param.headers = {
            cookie,
        };
    }
    return requestServer.request(param);
};

/**
 * 获取歌词
 * @param {Number} id 歌曲id
 * @return {Promise}
 */
export const requestLyric = promiseCache(id => requestServer.get(`/lyric?id=${id}`), id => `lyric-${id}`);

/**
 * 搜索建议
 * @param {String} keyword
 * @return {Promise}
 */
export const requestSuggestKeyword = promiseCache(
    keywords => requestServer.get(`/search/suggest?keywords=${keywords}`),
    keywords => `Suggest-${keywords}`,
);

/**
 * 搜索
 * @param {String} keyword
 * @return {Promise}
 */
export const requestSearchByKeyword = promiseCache(
    keywords => requestServer.get(`/search?keywords= ${keywords}`),
    keywords => `Search-${keywords}`,
);

/**
 * 获取视频播放地址
 * @param {Number} id 视频id
 * @return {Promise}
 */
export const getVideoUrl = promiseCache(id => requestServer.get(`/video/url?id=${id}`), id => `videoUrl-${id}`);


/**
 * 退出登录
 * @return {Promise}
 */
export const logout = () => requestServer.get('/logout');

/**
 * 获取用户关注列表
 * @param {Number} uid 用户id
 * @return {Promise}
 */
export const getUserFollow = promiseCache(uid => requestServer.get(`/user/follows?uid=${uid}`), uid => `follow-${uid}`);

/**
 * 获取用户粉丝列表
 * @param {Number} uid 用户id
 * @return {Promise}
 */
export const getUserFollowed = promiseCache(uid => requestServer.get(`/user/followeds?uid=${uid}`), uid => `followed-${uid}`);
