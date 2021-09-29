import axios from 'axios';
const axiosClient = axios.create({

    baseURL: 'http://localhost:4000',
    headers: {
        'Content-type': 'application/json',
        'x-access-token': localStorage.getItem("x-access-token")
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(function async (config) {
    // Do something before request is sent
    config.headers = {
        'x-access-token': localStorage.getItem("x-access-token"),
        'Content-type': 'application/json',
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function async (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const {config, data} = error.response;
    // if((status === 401 || status === 403) && data.message === 'Unauthorized!'){
    //     axiosClient.defaults.headers.common['x-access-token'] = localStorage.getItem("x-access-token");
    // }
    //console.log(error.config)
    if(config.url==="/api/user/signup" || config.url==="/api/user/login" || config.url==='/api/user/changepwd' || config.url==='/email/verifyemail' || config.url==='/email/otp'){
        throw new Error( data.message);
    }
    return Promise.reject(error);
});

export default axiosClient;