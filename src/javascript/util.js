// 公用方法库

export const isLogin = () => {
    return !!localStorage.getItem('skey');
}