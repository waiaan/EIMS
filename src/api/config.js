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
  jobs: `${API_VERSION}jobs`,
  managers: `${API_VERSION}managers`
}

for (let field in URLS) {
  let url = URLS[field];
  for (let api in METHODS) {
    let method = METHODS[api];
    config[api + field.replace(/^\S/, s => s.toUpperCase())] = { url, method };
  }
}

export default config;
