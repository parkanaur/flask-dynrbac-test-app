import Vue from 'vue'
import Vuex from 'vuex'

const axios = require('axios');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_list: [{'id': 1, 'name': 'asdf'},
                {'id': 2, 'name': 'kekes'}],
    user: {},

    role_list: {},
    role: {},

    permission_list: {},
    permission: {},

    unit_list: {},
    unit: {},

    cur_user: 1,
  },
  getters: {
    get_user_list: state => () => state.user_list,
    get_role_list: state => state.role_list,
    get_permission_list: state => state.permission_list,
    get_unit_list: state => state.unit_list,
  },
  mutations: {
  },
  actions: {
  }
})
