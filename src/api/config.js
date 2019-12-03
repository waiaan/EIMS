import { capitalize } from '@/utils'

const API_VERSION = 'v1/';

const config = {};

const METHODS = {
  add: 'post',
  get: 'get',
  modify: 'put',
  delete: 'delete'
}

const URLS = {
  employees: `${API_VERSION}employees`,
  locations: `${API_VERSION}locations`,
  departments: `${API_VERSION}departments`,
  jobs: `${API_VERSION}jobs`
}

for (let field in URLS) {
  let url = URLS[field];
  for (let api in METHODS) {
    let method = METHODS[api];
    config[api + capitalize(field)] = { url, method };
  }
}

export default config;
