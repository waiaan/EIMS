import axios from 'axios'
import config from './config'

const BASE_URL = process.env.VUE_APP_BASE_URL;

const http = (type, data) => {
  let { url, method } = config[type];
  return new Promise((resolve, reject) => {
    axios({ url: BASE_URL + url, method, params: { ...data } }).then(({ data }) => {
      resolve(data);
    })
  })
}

export default http
