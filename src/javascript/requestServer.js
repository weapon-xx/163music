import axios from 'axios';

const requestServer = axios.create({
    baseURL: 'http://163api.jacksonx.cn',
    withCredentials: true,
    timeout: 60000,
});

requestServer.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (+res.code !== 200) {
            console.error(`response error: ${res.msg}`);
            return Promise.reject(res);
            // report...
        }
        return Promise.resolve(res);
    },
    (error) => {
        console.error(`request error: ${error}`);
        // report...
    },
);

export default requestServer;
