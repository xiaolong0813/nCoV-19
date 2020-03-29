import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
    baseURL: isDev ? '/api/' : 'http://localhost:9000/api/',
    timeout: 5000
})

service.interceptors.response.use(
    response => {
        const res = response.data
        // if the err no is not 0,
        if(res.errNo !== 0) {
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res.data
        }
    },
    error => {
        console.log('err: ' + error)
        return Promise.reject(error)
    }
)

export default service
