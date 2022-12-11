import axios from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:4000/api/'
})

const authApi = axios.create({
    baseURL: 'http://localhost:4000/api/'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

authApi.interceptors.request.use(authInterceptor)

export {
    Api,
    authApi
}