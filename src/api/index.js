import axios from 'axios';

axios.defaults.withCredentials = true;

// const domain = '//163music.jacksonx.cn/api'
const domain = '//jacksonx.cn:3000';

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
    promiseCache.cache = {};
  }
  return function handle(...args) {
    const cachKey = convertParam.apply(ctx, args);
    if (!promiseCache.cache[cachKey]) {
      promiseCache.cache[cachKey] = fn(args);
    }
    return promiseCache.cache[cachKey];
  };
}

/**
 * 首页 banner
 * @return {Promise}
 */
export const requestBanner = promiseCache(() => axios.get(`${domain}/banner`).then(data => data.data), () => 'banner');

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
  return axios.get(`${domain}/login/cellphone?phone=${phone}&password=${password}`).then(data => data.data).catch(err => err.response);
};

/**
 * 获取推荐歌单
 * @return {Promise}
 */
export const requestResource = promiseCache(() => axios.request({
  method: 'get',
  url: `${domain}/recommend/resource`,
}).then(data => data.data), () => 'resource');

/**
 * 获取歌单详情
 * @param {Number} id  歌单id
 * @return {Promise}
 */
export const requestPlaylistDetail = promiseCache(id => axios.request({
  method: 'get',
  url: `${domain}/playlist/detail?id=${id}`,
}).then(data => data.data), id => `PlaylistDetail-${id}`);

/**
 * 获取歌单详情
 * @param {Number} id  歌单id
 * @return {Promise}
 */
export const requestSongDetail = promiseCache(id => axios.get(`${domain}/song/detail?ids=${id}`).then(data => data.data), id => `songDetail-${id}`);

/**
 * 获取歌单 url
 * @param {Number} id  歌单id
 * @return {Promise}
 */
export const requestSongUrl = promiseCache(id => axios.get(`${domain}/song/url?id=${id}`).then(data => data.data), id => `songUrl-${id}`);

/**
 * 获取登录状态
 * @return {Promise}
 */
export const requestLoginStatus = () => axios.get(`${domain}/login/status`).then(data => data.data);

/**
 * 获取用户创建歌单
 * @param {Number} useId 用户id
 * @return {Promise}
 */
export const requestUserPlaylist = promiseCache(
  uid => axios.get(`${domain}/user/playlist?uid=${uid}`).then(data => data.data),
  uid => `userPlaylist-${uid}`,
);

/**
 * 获取用户信息
 * @param {Number} useId 用户id
 * @return {Promise}
 */
export const requestUserDetail = promiseCache(
  uid => axios.get(`${domain}/user/detail?uid=${uid}`).then(data => data.data),
  uid => `userDetail-${uid}`,
);

/**
 * 获取动态消息
 * @return {Promise}
 */
export const requestEvent = () => axios.get(`${domain}/event`).then(data => data.data);

/**
 * 获取歌词
 * @param {Number} id 歌曲id
 * @return {Promise}
 */
export const requestLyric = promiseCache(id => axios.get(`${domain}/lyric?id=${id}`).then(data => data.data), id => `lyric-${id}`);

/**
 * 搜索建议
 * @param {String} keyword
 * @return {Promise}
 */
export const requestSuggestKeyword = promiseCache(
  keywords => axios.get(`${domain}/search/suggest?keywords=${keywords}`).then(data => data.data),
  keywords => `Suggest-${keywords}`,
);

/**
 * 搜索
 * @param {String} keyword
 * @return {Promise}
 */
export const requestSearchByKeyword = promiseCache(
  keywords => axios.get(`${domain}/search?keywords= ${keywords}`).then(data => data.data),
  keywords => `Search-${keywords}`,
);

/**
 * 获取视频播放地址
 * @param {Number} id 视频id
 */
export const getVideoUrl = promiseCache(id => axios.get(`${domain}/video/url?id=${id}`), id => `videoUrl-${id}`);
