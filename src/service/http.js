import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: 60000,
})

// 只做一点简单的判断
http.interceptors.response.use((response) => {
  const { status } = response
  if (status < 200 || status > 300) {
    alert('请求发生错误')
    response.message = '请求发生错误'
    response.err_code = 110000
  } else {
    response.err_code = 0
  }
  return response
}, (err) => {
  err.data = {};
  err.data.message = '请求发生错误';
  return Promise.resolve(err);
})

export default http