import axios from 'axios'
import config from './config'

const BASE_URL = process.env.VUE_APP_BASE_URL;

const api = (type, data) => {
  let conf = config[type];
  conf = Object.assign({}, conf, { url: BASE_URL + conf.url });
  if (data) {
    conf = Object.assign({}, conf, { data });
  }
  return new Promise((resolve) => {
    axios(conf).then((res) => {
      resolve(res);
    })
  })
}

export default api
