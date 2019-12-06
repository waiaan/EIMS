import Vue from 'vue'
import Vuex from 'vuex'

import http from '@/api'
import { capitalize } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    employees: [],
    jobs: [],
    departments: [],
    locations: []
  },
  mutations: {
    setData (state, payload) {
      const { type, data } = payload;
      state[type] = data;
    }
  },
  actions: {
    getAllData ({ commit, state }, payload) {
      const { type, params = {} } = payload;
      const api = 'get' + capitalize(type);
      return new Promise((resolve, reject) => {
        http(api, params).then((data) => {
          commit('setData', { type, data: data });
          resolve(data);
        }, (err) => {
          reject(err)
        })
      })
    },
    deleteData ({ commit, state, dispatch }, payload) {
      const { type, id } = payload;
      const api = 'delete' + capitalize(type);
      return new Promise((resolve, reject) => {
        http(api, id).then((data) => {
          resolve(data);
        }, (err) => {
          reject(err)
        })
      })
    },
    saveData ({ commit, state, dispatch }, payload) {
      const { type, params } = payload;
      const api = 'modify' + capitalize(type);
      return new Promise((resolve, reject) => {
        http(api, params).then((data) => {
          resolve(data);
        }, (err) => {
          reject(err)
        })
      })
    },
    addData ({ commit, state, dispatch }, payload) {
      const { type, params } = payload;
      const api = 'add' + capitalize(type);
      return new Promise((resolve, reject) => {
        http(api, params).then((data) => {
          resolve(data);
        }, (err) => {
          reject(err)
        })
      })
    }
  }
})
