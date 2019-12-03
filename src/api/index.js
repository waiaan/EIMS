import axios from 'axios'
import config from './config'

const BASE_URL = process.env.VUE_APP_BASE_URL;

const paramsType = {
  get: 'params',
  put: 'data',
  post: 'data',
  delete: 'data'
}

const http = (type, data) => {
  let { url, method } = config[type];
  return new Promise((resolve, reject) => {
    if (typeof data !== 'object') {
      axios({ url: BASE_URL + url + '/' + data, method }).then(({ data }) => {
        resolve(data);
      }, (err) => {
        reject(err)
      })
    } else {
      axios({ url: BASE_URL + url, method, [paramsType[method]]: { ...data } }).then(({ data }) => {
        resolve(data);
      }, (err) => {
        reject(err)
      })
    }
  })
}

export default http
