import axios from 'axios'

axios.defaults.timeout = 30000

// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
export default axios
