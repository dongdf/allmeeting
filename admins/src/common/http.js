
import axios from 'axios'
import {OPEN_AUTH_URL} from '@/constants'
import { HOST } from '@/constants'
import {REDIRECT_URL} from '@/constants'
// import {storage} from '@/utils/tools'


const Axios = axios.create({
  baseURL:HOST,//http://192.168.1.210:16001
  withCredentials: true,
  responseType: 'json', // default
  transformResponse: [function (data) {
    return data
  }],
  timeout: 30000
})



// let Axios = axios.create({
//   //baseURL: localhost,
//   withCredentials: true,
//   responseType: 'json', // default
//   transformResponse: [function (data) {
//     return data
//   }],
//   timeout: 30000
// })

//http://192.168.69.114:16401/knowledge/knowledgeTypes

Axios.interceptors.request.use(config => {

  //config.headers['WX_UID'] = localStorage.getItem('WX_UID') || ''
  //
  // config.headers['WX-UID'] = localStorage.getItem('sid');
  //config.headers['reqType'] = 'chsWechat'
  config.headers['Content-Type'] = 'application/json'
  return config
}, error => {
  return Promise.reject(error)
})

Axios.interceptors.response.use(response => {
  if(response.data.code !=200){
    // alert(response.data.msg);
    // localStorage.clear()
    // window.location.replace(REDIRECT_URL+'/daxiang/')
  }
  return Promise.resolve(response)
}, error => {
  return Promise.reject(error.response)
})

export default Axios
